import { motion } from 'motion/react';
import { Download, HandHeart, Images, ShieldCheck, Smartphone } from 'lucide-react';
import { appLinks } from '../appLinks';
import { trackAppDownload } from '../tracking';

type AppComingSoonProps = {
  language: string;
  labels: {
    badge: string;
    downloadLabel: string;
    appStoreLabel: string;
    storesNote: string;
    title: string;
    description: string;
    features: ReadonlyArray<{ title: string; text: string }>;
  };
};

const FEATURE_ICONS = [HandHeart, ShieldCheck, Images];

// "Trahom app": a short description and the Google Play and App Store links.
export function AppComingSoon({ language, labels }: AppComingSoonProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      aria-labelledby="app-coming-soon-title"
      className="mt-16 bg-[#103b51] rounded-2xl p-8 sm:p-10 text-white overflow-hidden"
    >
      <div className="grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-[#f3c35a] rounded-full text-sm mb-6">
            <Smartphone className="w-4 h-4" aria-hidden="true" />
            {labels.badge}
          </div>
          <h2 id="app-coming-soon-title" className="text-3xl tracking-tight mb-4">
            {labels.title}
          </h2>
          <p className="text-white/80 leading-relaxed mb-8 max-w-xl">{labels.description}</p>
          <ul className="grid sm:grid-cols-3 gap-4">
            {labels.features.map((feature, index) => {
              const Icon = FEATURE_ICONS[index] ?? HandHeart;
              return (
                <li key={feature.title} className="bg-white/5 rounded-xl p-4">
                  <Icon className="w-6 h-6 text-[#f3c35a] mb-3" aria-hidden="true" />
                  <h3 className="text-base font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{feature.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="md:col-span-2 bg-white text-foreground rounded-2xl p-6 sm:p-8">
          <a
            href={appLinks.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAppDownload('google-play', 'home-app-section', language)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#e1a226] text-white px-6 py-3.5 text-lg font-medium hover:bg-[#c78f1f] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103b51]"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
            {labels.downloadLabel}
          </a>
          <a
            href={appLinks.appStore}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAppDownload('app-store', 'home-app-section', language)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#103b51] text-white px-6 py-3.5 text-lg font-medium hover:bg-[#0c2e40] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1a226]"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
            {labels.appStoreLabel}
          </a>
          <p className="mt-4 text-center text-sm text-foreground/60">{labels.storesNote}</p>
        </div>
      </div>
    </motion.section>
  );
}
