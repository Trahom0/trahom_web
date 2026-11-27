import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, Download, HandHeart, MessageCircle, Search, ShieldCheck } from 'lucide-react';
import appScreenCases from '../../assets/app-screen-cases.jpg';
import { content } from '../../content';
import { appLinks } from '../appLinks';
import { getPathForPage, isPlainLeftClick, type LanguageCode, type PageKey } from '../routes';
import { trackAppDownload } from '../tracking';
import { PageLayout } from './PageLayout';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface AppPageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

const FEATURE_ICONS = [Search, HandHeart, BadgeCheck, MessageCircle, ShieldCheck];

// Campaign tags (utm_*) on this page's address are passed on to the stores, so an install can be traced
// back to the ad: Google Play reads them from "referrer"; the App Store uses its own campaign token (ct),
// plus a provider token (pt) when one is set in appLinks.
const withCampaign = (search: string) => {
  const params = new URLSearchParams(search);
  const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((key) => [key, (params.get(key) ?? '').replace(/[^\w.-]/g, '').slice(0, 60)] as const)
    .filter(([, value]) => value);
  const campaign = utm.find(([key]) => key === 'utm_campaign')?.[1] ?? '';

  const play = new URL(appLinks.googlePlay);
  if (utm.length) {
    play.searchParams.set('referrer', utm.map(([key, value]) => `${key}=${value}`).join('&'));
  }
  const apple = new URL(appLinks.appStore);
  if (campaign) {
    apple.searchParams.set('ct', campaign.slice(0, 40));
    if (appLinks.appStoreProviderToken) {
      apple.searchParams.set('pt', appLinks.appStoreProviderToken);
    }
  }
  return { googlePlay: play.toString(), appStore: apple.toString() };
};

// Landing page for the Trahom app (/app): what it does, a screenshot, and the two store buttons.
// This is the page the app's ads link to.
export function AppPage({ onNavigate, language, onLanguageChange }: AppPageProps) {
  const labels = content.appPage;
  const currentLanguage = (language ?? 'EN') as LanguageCode;
  const [links, setLinks] = useState<{ googlePlay: string; appStore: string }>({
    googlePlay: appLinks.googlePlay,
    appStore: appLinks.appStore
  });

  useEffect(() => {
    setLinks(withCampaign(window.location.search));
  }, []);

  const sponsorHref = `${getPathForPage('sponsor-orphan', currentLanguage)}#orphans`;
  const goToSponsor = (event: { preventDefault: () => void }) => {
    if (!isPlainLeftClick(event)) {
      return;
    }
    event.preventDefault();
    onNavigate?.('sponsor-orphan');
  };

  const StoreButtons = ({ placement, dark }: { placement: string; dark?: boolean }) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
    const primary = dark
      ? `${base} bg-white text-[#103b51] hover:bg-[#fbf1dc] focus-visible:outline-white`
      : `${base} bg-[#e1a226] text-white hover:bg-[#c78f1f] focus-visible:outline-[#103b51]`;
    const secondary = dark
      ? `${base} border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white`
      : `${base} bg-[#103b51] text-white hover:bg-[#0c2e40] focus-visible:outline-[#e1a226]`;
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <a href={links.googlePlay} target="_blank" rel="noopener noreferrer" className={primary} onClick={() => trackAppDownload('google-play', placement, currentLanguage)}>
          <Download className="w-5 h-5" aria-hidden="true" />
          {labels.googlePlay}
        </a>
        <a href={links.appStore} target="_blank" rel="noopener noreferrer" className={secondary} onClick={() => trackAppDownload('app-store', placement, currentLanguage)}>
          <Download className="w-5 h-5" aria-hidden="true" />
          {labels.appStore}
        </a>
      </div>
    );
  };

  return (
    <PageLayout
      header={<SiteHeader onNavigate={onNavigate} activePage="app" language={language} onLanguageChange={onLanguageChange} />}
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >
      <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
          <div className="inline-flex items-center gap-2 bg-[#e1a226]/10 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-[#b07a10]">{labels.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">{labels.title}</h1>
          <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed mb-8 max-w-xl">{labels.description}</p>
          <StoreButtons placement="app-page-hero" />
          <p className="mt-4 text-sm text-foreground/60">{labels.freeNote}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-[300px] rounded-[40px] bg-[#103b51] p-3 shadow-xl shadow-black/20">
            <img
              src={appScreenCases}
              alt={labels.screenshotAlt}
              width={819}
              height={1045}
              loading="eager"
              className="w-full h-auto rounded-[30px] block"
            />
          </div>
        </motion.div>
      </section>

      <section className="mb-16" aria-labelledby="app-features-title">
        <h2 id="app-features-title" className="text-3xl sm:text-4xl tracking-tight mb-8">{labels.features.title}</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {labels.features.items.map((item, index) => {
            const Icon = FEATURE_ICONS[index] ?? Search;
            return (
              <li key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
                <span className="w-11 h-11 rounded-xl bg-[#e1a226]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#b07a10]" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-16" aria-labelledby="app-steps-title">
        <h2 id="app-steps-title" className="text-3xl sm:text-4xl tracking-tight mb-8">{labels.steps.title}</h2>
        <ol className="grid gap-5 md:grid-cols-3">
          {labels.steps.items.map((step, index) => (
            <li key={step.title} className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
              <div className="text-sm font-semibold text-[#e1a226] mb-3">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="text-lg font-medium mb-2">{step.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#103b51] text-white rounded-2xl p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl tracking-tight mb-3">{labels.cta.title}</h2>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-8">{labels.cta.text}</p>
        <StoreButtons placement="app-page-bottom" dark />
        <a href={sponsorHref} onClick={goToSponsor} className="inline-block mt-6 text-sm text-[#f3c35a] hover:underline">
          {labels.cta.browseLabel}
        </a>
      </section>
    </PageLayout>
  );
}
