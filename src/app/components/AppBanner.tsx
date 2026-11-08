import { motion } from 'motion/react';
import { Clock, Download, Smartphone } from 'lucide-react';
import { appLinks } from '../appLinks';
import { trackAppDownload } from '../tracking';

type AppBannerProps = {
  language: string;
  labels: { label: string; title: string; text: string; cta: string; note: string };
};

// "The Trahom app is now on Google Play": a strip at the very top of the home page, above the hero.
export function AppBanner({ language, labels }: AppBannerProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      aria-label={labels.title}
      className="relative overflow-hidden mb-10 sm:mb-12 rounded-2xl bg-[#103b51] text-white px-5 py-5 sm:px-8 sm:py-6"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -end-16 w-56 h-56 rounded-full bg-[#e1a226]/20 blur-2xl"
      />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <span className="hidden sm:flex w-14 h-14 rounded-2xl bg-[#e1a226] items-center justify-center shrink-0">
          <Smartphone className="w-7 h-7 text-white" aria-hidden="true" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg sm:text-xl font-medium leading-snug">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e1a226] px-3 py-0.5 text-sm text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white motion-safe:animate-pulse" aria-hidden="true" />
              {labels.label}
            </span>
            {labels.title}
          </p>
          <p className="mt-1 text-sm sm:text-base text-white/75">{labels.text}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#f3c35a]">
            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
            {labels.note}
          </p>
        </div>
        <a
          href={appLinks.googlePlay}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAppDownload('google-play', 'home-banner', language)}
          className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-white text-[#103b51] px-6 py-3 font-medium hover:bg-[#fbf1dc] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1a226]"
        >
          <Download className="w-5 h-5" aria-hidden="true" />
          {labels.cta}
        </a>
      </div>
    </motion.aside>
  );
}
