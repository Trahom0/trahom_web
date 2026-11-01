// Measurement.
//
// Google Analytics (already on every page, see index.html) receives the actions that matter for the
// Google Ads (Ad Grants) campaigns: a sponsorship request for an orphan, a WhatsApp chat, a contact message,
// a sign-up and a completed donation. No names, emails or phone numbers are ever sent, only the orphan's
// public code, the page and the amount.
//
// Advertising measurement (Meta Pixel), loaded only after the visitor agrees in the consent banner.
//
// - Nothing is sent to Meta before consent, and nothing at all if the visitor declines.
// - Automatic data collection is switched off (no "automatic advanced matching"), so text typed into the
//   donation or contact forms is never read by the pixel. Only page views and completed donations
//   (amount and currency, no personal details) are reported.

export const META_PIXEL_ID = '1607316087532710';

const CONSENT_KEY = 'trahom-consent';
const PENDING_DONATION_KEY = 'trahom-pending-donation';
export const CONSENT_EVENT = 'trahom:consent-changed';
export const OPEN_CONSENT_EVENT = 'trahom:open-consent';

export type Consent = 'accepted' | 'declined' | null;

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown; callMethod?: (...args: unknown[]) => void };

export const getConsent = (): Consent => {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
};

export const setConsent = (value: 'accepted' | 'declined') => {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Private mode: the choice lasts for this visit only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
};

let pixelLoaded = false;

// The standard Meta Pixel loader, run only after consent.
const loadMetaPixel = () => {
  if (pixelLoaded || typeof window === 'undefined') {
    return;
  }
  pixelLoaded = true;
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  if (!w.fbq) {
    const fbq: Fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue?.push(args);
      }
    } as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    w.fbq = fbq;
    w._fbq = w._fbq ?? fbq;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }
  w.fbq?.('set', 'autoConfig', false, META_PIXEL_ID);
  w.fbq?.('init', META_PIXEL_ID);
};

const gaEvent = (name: string, params: Record<string, string | number>) => {
  if (typeof window === 'undefined') {
    return;
  }
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', name, params);
  }
};

// "Request documents" on an orphan's card: the main result of the orphan sponsorship campaigns.
export const trackSponsorRequest = (orphanCode: string, language: string) => {
  gaEvent('sponsor_request', { orphan_code: orphanCode, language });
};

export const trackWhatsAppClick = (page: string) => {
  gaEvent('whatsapp_click', { page_key: page });
};

export const trackContactSent = (language: string) => {
  gaEvent('generate_lead', { form: 'contact', language });
};

export const trackSignUp = (topic: string, language: string) => {
  gaEvent('sign_up', { method: topic, language });
};

const fbq = (...args: unknown[]) => {
  const w = window as unknown as { fbq?: Fbq };
  w.fbq?.(...args);
};

// Called on first load and on every page change inside the site.
export const trackPageView = () => {
  if (typeof window === 'undefined' || getConsent() !== 'accepted') {
    return;
  }
  loadMetaPixel();
  fbq('track', 'PageView');
};

// The visitor pressed "proceed to payment".
export const trackCheckoutStarted = (amount: number) => {
  if (typeof window === 'undefined' || getConsent() !== 'accepted') {
    return;
  }
  loadMetaPixel();
  fbq('track', 'InitiateCheckout', { value: amount, currency: 'USD' });
};

// Remember the donation just before going to Stripe, so it can be reported once the visitor comes back paid.
export const rememberPendingDonation = (amount: number, frequency: string) => {
  try {
    window.sessionStorage.setItem(PENDING_DONATION_KEY, JSON.stringify({ amount, frequency, at: Date.now() }));
  } catch {
    // Not critical.
  }
};

export const reportCompletedDonation = () => {
  let pending: { amount?: number; frequency?: string; at?: number } | null = null;
  try {
    pending = JSON.parse(window.sessionStorage.getItem(PENDING_DONATION_KEY) ?? 'null');
    window.sessionStorage.removeItem(PENDING_DONATION_KEY);
  } catch {
    pending = null;
  }
  // Only a donation started in this tab within the last 2 hours is reported, and only once.
  if (!pending || typeof pending.amount !== 'number' || Date.now() - (pending.at ?? 0) > 2 * 60 * 60 * 1000) {
    return;
  }
  gaEvent('donation_completed', { value: pending.amount, currency: 'USD', frequency: pending.frequency === 'monthly' ? 'monthly' : 'one-time' });
  if (getConsent() !== 'accepted') {
    return;
  }
  loadMetaPixel();
  fbq('track', 'Donate', { value: pending.amount, currency: 'USD', content_category: pending.frequency === 'monthly' ? 'monthly' : 'one-time' });
};
