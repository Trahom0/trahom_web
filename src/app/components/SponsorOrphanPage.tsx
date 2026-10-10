import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import orphanPlaceholderImage from '../../assets/homepage-card-orphan-campaign.jpg';
import { content } from '../../content';
import { formatTemplate } from '../../content/utils';
import { getPathForPage, type LanguageCode, type PageKey, isPlainLeftClick } from '../routes';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageLayout } from './PageLayout';
import { PrimaryButton } from './PrimaryButton';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface SponsorOrphanPageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

const WHATSAPP_NUMBER = '972567075706';
const ORPHANS_API_URL = '/api/orphans';

type OrphanProfile = {
  code: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionTr: string;
  image: string;
};

const buildWhatsAppLink = (code: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    formatTemplate(content.sponsorOrphan.whatsapp.messageTemplate, { code })
  )}`;

export function SponsorOrphanPage({ onNavigate, language, onLanguageChange }: SponsorOrphanPageProps) {
  const sponsorContent = content.sponsorOrphan;
  const currentLanguage = (language ?? 'EN') as LanguageCode;
  const contactHref = getPathForPage('contact', currentLanguage);
  const steps = sponsorContent.steps.items;
  const [profiles, setProfiles] = useState<OrphanProfile[]>([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);
  const [profilesError, setProfilesError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch(ORPHANS_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(sponsorContent.errors.fetch);
        }
        return response.json();
      })
      .then((data: { profiles?: OrphanProfile[] }) => {
        const nextProfiles = (data.profiles ?? []).map((profile) => ({
          ...profile,
          image: profile.image || orphanPlaceholderImage
        }));
        if (isMounted) {
          setProfiles(nextProfiles);
          setProfilesError(null);
          setIsLoadingProfiles(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProfiles([]);
          setProfilesError(sponsorContent.errors.profilesUnavailable);
          setIsLoadingProfiles(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavClick = (page: PageKey) => (event: { preventDefault: () => void }) => {
    if (!isPlainLeftClick(event)) {
      return;
    }
    event.preventDefault();
    onNavigate?.(page);
  };

  const getProfileDescription = (profile: OrphanProfile) => {
    if (currentLanguage === 'AR') {
      return profile.descriptionAr || profile.descriptionEn || profile.descriptionTr;
    }
    if (currentLanguage === 'TR') {
      return profile.descriptionTr || profile.descriptionEn || profile.descriptionAr;
    }
    return profile.descriptionEn || profile.descriptionTr || profile.descriptionAr;
  };

  const profileCountLabel = profilesError
    ? sponsorContent.available.countLabels.error
    : isLoadingProfiles
      ? sponsorContent.available.countLabels.loading
      : formatTemplate(sponsorContent.available.countLabels.availableTemplate, { count: profiles.length });

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="sponsor-orphan"
          language={language}
          onLanguageChange={onLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-[#e1a226]/10 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-[#e1a226]">{sponsorContent.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              {sponsorContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed mb-8">
              {sponsorContent.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton
                href="#orphans"
                size="md"
                className="font-medium hover:bg-[#d1921f] text-center"
              >
                {sponsorContent.hero.primaryCta}
              </PrimaryButton>
              <a
                href={contactHref}
                className="border border-black/10 text-foreground px-6 py-3 rounded-full font-medium hover:border-[#e1a226] hover:text-[#e1a226] transition-colors text-center"
                onClick={handleNavClick('contact')}
              >
                {sponsorContent.hero.secondaryCta}
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[32px] shadow-sm">
              <ImageWithFallback
                src={orphanPlaceholderImage}
                alt={sponsorContent.hero.imageAlt}
                loading="eager"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </motion.div>
        </section>

        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl tracking-tight mb-3">{sponsorContent.steps.title}</h2>
            <p className="text-foreground/70 text-lg max-w-2xl">
              {sponsorContent.steps.description}
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-black/5"
              >
                <div className="text-sm font-semibold text-[#e1a226] mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl mb-2">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="orphans" className="scroll-mt-52">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl tracking-tight mb-3">{sponsorContent.available.title}</h2>
              <p className="text-foreground/70 text-lg max-w-2xl">
                {sponsorContent.available.description}
              </p>
            </div>
            <span className="text-sm text-foreground/50">{profileCountLabel}</span>
          </motion.div>

          {isLoadingProfiles ? (
            <div className="rounded-3xl border border-dashed border-black/10 bg-white p-8 text-center text-sm text-foreground/60">
              {sponsorContent.available.states.loading}
            </div>
          ) : profilesError ? (
            <div className="rounded-3xl border border-dashed border-[#e1a226]/40 bg-white p-8 text-center">
              <p className="text-sm text-foreground/70 mb-3">{profilesError}</p>
              <a
                href={contactHref}
                className="text-sm font-semibold text-[#e1a226] hover:underline"
                onClick={handleNavClick('contact')}
              >
                {sponsorContent.contactLinkLabel}
              </a>
            </div>
          ) : profiles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-black/10 bg-white p-8 text-center text-sm text-foreground/60">
              {sponsorContent.available.states.empty}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {profiles.map((orphan, index) => {
                const description = getProfileDescription(orphan);
                return (
                  <motion.article
                    key={orphan.code}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: index * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 flex flex-col"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={orphan.image}
                        alt={formatTemplate(sponsorContent.profile.altTemplate, { code: orphan.code })}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col gap-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wide text-foreground/50">{sponsorContent.profile.codeLabel}</span>
                        <span className="text-xs font-semibold bg-[#e1a226]/10 text-[#e1a226] px-3 py-1 rounded-full">
                          {orphan.code}
                        </span>
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        {description ? (
                          <p
                            className="text-sm sm:text-base text-foreground/70 leading-relaxed text-start"
                            dir="auto"
                          >
                            {description}
                          </p>
                        ) : null}
                      </div>
                      <a
                        href={buildWhatsAppLink(orphan.code)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-foreground hover:border-[#e1a226] hover:bg-[#e1a226] hover:text-white transition-colors"
                      >
                        {sponsorContent.profile.requestLabel}
                        <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          <div className="mt-10 bg-[#e1a226]/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl mb-1">{sponsorContent.privacyNote.title}</h3>
              <p className="text-foreground/70">
                {sponsorContent.privacyNote.description}
              </p>
            </div>
            <a
              href={contactHref}
              className="text-sm font-semibold text-[#e1a226] hover:underline"
              onClick={handleNavClick('contact')}
            >
              {sponsorContent.privacyNote.linkLabel}
            </a>
          </div>
        </section>
    </PageLayout>
  );
}
