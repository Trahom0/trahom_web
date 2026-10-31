import { motion } from 'motion/react';
import { BellRing, HandHeart, Images, ShieldCheck, Smartphone } from 'lucide-react';
import { SubscribeForm } from './SubscribeForm';

type AppComingSoonProps = {
  language: string;
  labels: {
    badge: string;
    title: string;
    description: string;
    features: ReadonlyArray<{ title: string; text: string }>;
    formTitle: string;
    inputPlaceholder: string;
    buttonLabel: string;
    helperText: string;
    successMessage: string;
    errorMessage: string;
  };
};

const FEATURE_ICONS = [HandHeart, ShieldCheck, Images];

// "Trahom app, coming soon to Google Play and the App Store": a short description and a sign-up to be told when it launches.
// When the app is live, swap the form for the official Google Play and App Store links.
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
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-xl bg-[#e1a226]/15 flex items-center justify-center shrink-0">
              <BellRing className="w-5 h-5 text-[#b07a10]" aria-hidden="true" />
            </span>
            <p className="text-lg font-medium text-[#103b51]">{labels.formTitle}</p>
          </div>
          <SubscribeForm language={language} labels={labels} topic="app" inputId="app-notify-email" stacked />
        </div>
      </div>
    </motion.section>
  );
}
