import { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import type { PageKey } from '../routes';
import { content } from '../../content';
import { appLinks } from '../appLinks';
import { CONSENT_EVENT, getConsent, trackAppDownload } from '../tracking';

type AppPromoProps = {
  page: PageKey;
  language: string;
};

// Pages where the card would get in the way of what the visitor came to do.
const HIDDEN_ON: PageKey[] = ['donate', 'family-signup'];
const STORAGE_KEY = 'trahom-app-promo';
const DISMISS_DAYS = 14; // after "close"
const DOWNLOADED_DAYS = 60; // after tapping a store button
const SHOW_AFTER_MS = 8000;

type Platform = 'android' | 'ios' | 'other';

const detectPlatform = (): Platform => {
  const agent = navigator.userAgent || '';
  if (/android/i.test(agent)) {
    return 'android';
  }
  // iPadOS reports itself as a Mac with a touch screen.
  if (/iphone|ipad|ipod/i.test(agent) || (/macintosh/i.test(agent) && navigator.maxTouchPoints > 1)) {
    return 'ios';
  }
  return 'other';
};

const hiddenUntil = () => {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
};

const hideFor = (days: number) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now() + days * 24 * 60 * 60 * 1000));
  } catch {
    // Private browsing: the card simply comes back on the next visit.
  }
};

// "Get the Trahom app": a small card in the corner of every page (a strip above the WhatsApp button on
// phones). It appears after a few seconds or once the visitor scrolls, never while the privacy banner is
// open, and stays away for two weeks after it is closed. Shown only in the browser, after load, so the
// prerendered pages stay the same for everyone.
export function AppPromo({ page, language }: AppPromoProps) {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [ready, setReady] = useState(false);
  const [consentOpen, setConsentOpen] = useState(true);
  const [closed, setClosed] = useState(false);
  const labels = content.shared.appPromo;

  useEffect(() => {
    if (hiddenUntil() > Date.now()) {
      setClosed(true);
      return;
    }
    setPlatform(detectPlatform());
    setConsentOpen(getConsent() === null);
    const onConsent = () => setConsentOpen(getConsent() === null);
    window.addEventListener(CONSENT_EVENT, onConsent);

    const timer = window.setTimeout(() => setReady(true), SHOW_AFTER_MS);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setReady(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(CONSENT_EVENT, onConsent);
    };
  }, []);

  if (closed || !ready || consentOpen || !platform || HIDDEN_ON.includes(page)) {
    return null;
  }
  // iPhone visitors see the card only once the App Store version is live.
  if (platform === 'ios' && !appLinks.appStore) {
    return null;
  }

  const showPlay = platform !== 'ios';
  const showAppStore = platform !== 'android' && Boolean(appLinks.appStore);

  const close = () => {
    hideFor(DISMISS_DAYS);
    setClosed(true);
  };
  const tapped = (store: 'google-play' | 'app-store') => () => {
    trackAppDownload(store, 'corner-card', language);
    hideFor(DOWNLOADED_DAYS);
    setClosed(true);
  };

  const buttonClass =
    'inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#e1a226] text-white px-4 py-2.5 text-sm font-medium hover:bg-[#c78f1f] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103b51]';

  return (
    <aside
      aria-label={labels.title}
      className="fixed inset-x-3 bottom-20 z-40 sm:inset-x-auto sm:bottom-6 sm:start-6 sm:w-[360px] rounded-2xl bg-[#103b51] text-white shadow-xl shadow-black/25 p-4 print:hidden motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4"
    >
      <button
        type="button"
        onClick={close}
        aria-label={labels.close}
        className="absolute top-2 end-2 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
      <div className="flex items-start gap-3 pe-8">
        <span className="w-11 h-11 rounded-xl bg-[#e1a226] flex items-center justify-center shrink-0">
          <Smartphone className="w-6 h-6 text-white" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-medium leading-snug">{labels.title}</p>
          <p className="mt-1 text-sm text-white/75 leading-snug">{labels.text}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {showPlay && (
          <a href={appLinks.googlePlay} target="_blank" rel="noopener noreferrer" onClick={tapped('google-play')} className={buttonClass}>
            <Download className="w-4 h-4" aria-hidden="true" />
            {labels.googlePlay}
          </a>
        )}
        {showAppStore && (
          <a href={appLinks.appStore} target="_blank" rel="noopener noreferrer" onClick={tapped('app-store')} className={buttonClass}>
            <Download className="w-4 h-4" aria-hidden="true" />
            {labels.appStore}
          </a>
        )}
      </div>
      {platform === 'other' && !appLinks.appStore && <p className="mt-2 text-xs text-[#f3c35a]">{labels.appStoreSoon}</p>}
    </aside>
  );
}
