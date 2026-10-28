import { useEffect, useState } from 'react';
import { content } from '../../content';
import { getPathForPage, type LanguageCode } from '../routes';
import { CONSENT_EVENT, OPEN_CONSENT_EVENT, getConsent, setConsent, trackPageView } from '../tracking';

type ConsentBannerProps = {
  language: string;
};

// Asks once whether advertising measurement (Meta Pixel) may run. Shown only in the browser, after load,
// so the prerendered pages stay identical for everyone. "Privacy settings" in the footer re-opens it.
export function ConsentBanner({ language }: ConsentBannerProps) {
  const [open, setOpen] = useState(false);
  const labels = content.shared.consent;

  useEffect(() => {
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) {
    return null;
  }

  const choose = (value: 'accepted' | 'declined') => {
    const previous = getConsent();
    setConsent(value);
    setOpen(false);
    if (value === 'accepted') {
      trackPageView();
    } else if (previous === 'accepted') {
      // The pixel cannot be unloaded from a running page; a reload starts the visit without it.
      window.location.reload();
    }
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={labels.title}
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 print:hidden"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-black/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm leading-relaxed text-foreground/80 flex-1">
          {labels.text}{' '}
          <a href={getPathForPage('privacy', (language ?? 'EN') as LanguageCode)} className="underline hover:text-foreground">
            {labels.policyLink}
          </a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose('declined')}
            className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            {labels.decline}
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded-full bg-[#103b51] text-white px-4 py-2 text-sm font-medium hover:bg-[#0c2e40]"
          >
            {labels.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

// Used by the footer link.
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));

// Re-export for callers that only need to know when the choice changes.
export { CONSENT_EVENT };
