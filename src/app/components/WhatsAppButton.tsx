import { MessageCircle } from 'lucide-react';
import type { PageKey } from '../routes';
import { whatsappNumber } from '../routes';
import { content } from '../../content';

type WhatsAppButtonProps = {
  page: PageKey;
};

// Pages where a floating button would get in the way (the registration form's own buttons sit at the
// bottom of the embedded form on phones).
const HIDDEN_ON: PageKey[] = ['family-signup'];

// A floating "chat with us" button that opens WhatsApp with a message that fits the current page,
// so the team knows what the visitor is asking about.
export function WhatsAppButton({ page }: WhatsAppButtonProps) {
  if (HIDDEN_ON.includes(page)) {
    return null;
  }

  const labels = content.shared.whatsapp;
  const messages = labels.messages as Record<string, string>;
  const message = messages[page] ?? messages.default;
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={labels.ariaLabel}
      title={labels.hint}
      onClick={() => {
        // Lets Google Tag Manager count chat starts per page, if a tag is set up for it.
        const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
        layer?.push({ event: 'whatsapp_click', page });
      }}
      className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#128C4A] text-white shadow-lg shadow-black/20 px-4 py-3 sm:px-5 hover:bg-[#0f7a40] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#128C4A]/40 transition-colors print:hidden"
    >
      <MessageCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-sm font-medium">{labels.label}</span>
    </a>
  );
}
