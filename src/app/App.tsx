import { Heart, Users, Globe, Award, Shield, CheckCircle } from 'lucide-react';
import { ImpactCard } from './components/ImpactCard';
import { CampaignCard } from './components/CampaignCard';
import { TextCard } from './components/TextCard';
import { CampaignsPage } from './components/CampaignsPage';
import { MissionPage } from './components/MissionPage';
import { ContactPage } from './components/ContactPage';
import { DonatePage } from './components/DonatePage';
import { ImpactPage } from './components/ImpactPage';
import { FamilySignUpPage } from './components/FamilySignUpPage';
import { SponsorOrphanPage } from './components/SponsorOrphanPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { GalleryPage } from './components/GalleryPage';
import { CareersPage } from './components/CareersPage';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { PageLayout } from './components/PageLayout';
import { PrimaryButton } from './components/PrimaryButton';
import orphanCampaignImage from '../assets/homepage-card-orphan-campaign.jpg';
import waterCampaignImage from '../assets/homepage-card-water.png';
import { content, setContentLanguage } from '../content';
import { actionPaths, getPathForPage, getRouteFromPath, localizePath, pagePaths, type LanguageCode, type PageKey } from './routes';
import { cloudinaryVideos } from './cloudinary';
import { applySeo } from './seo';

type AppProps = {
  initialPath?: string;
};

export default function App({ initialPath }: AppProps) {
  const homeContent = content.home;
  const [showWideCard, setShowWideCard] = useState(false);
  const getInitialRoute = () => {
    if (initialPath) {
      return getRouteFromPath(initialPath);
    }
    if (typeof window === 'undefined') {
      return { page: 'home' as PageKey, language: 'EN' as LanguageCode };
    }
    return getRouteFromPath(window.location.pathname);
  };
  const [currentPage, setCurrentPage] = useState<PageKey>(() => getInitialRoute().page);
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const initialLanguage = getInitialRoute().language;
    setContentLanguage(initialLanguage);
    return initialLanguage;
  });

  const handleLanguageChange = (languageCode: string) => {
    const nextLanguage = (['EN', 'AR', 'TR'].includes(languageCode) ? languageCode : 'EN') as LanguageCode;
    setContentLanguage(nextLanguage);
    setLanguage(nextLanguage);
    if (typeof window !== 'undefined') {
      const nextPath = getPathForPage(currentPage, nextLanguage);
      const nextUrl = `${nextPath}${window.location.search}${window.location.hash}`;
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (currentUrl !== nextUrl) {
        window.history.pushState({}, '', nextUrl);
      }
    }
  };

  useEffect(() => {
    applySeo({ page: currentPage, seo: content.seo, path: getPathForPage(currentPage, language) });
  }, [currentPage, language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowWideCard((prev) => !prev);
    }, 10000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const { page, language: nextLanguage } = getRouteFromPath(window.location.pathname);
      setContentLanguage(nextLanguage);
      setLanguage(nextLanguage);
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: PageKey) => {
    const nextPath = getPathForPage(page, language);
    if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setCurrentPage(page);
  };

  const handleNavClick = (page: PageKey) => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigateTo(page);
  };

  const handleDonateWithCause = (cause: string) => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const nextPath = `${localizePath(pagePaths.donate, language)}?cause=${encodeURIComponent(cause)}`;
    if (typeof window !== 'undefined') {
      const currentPath = `${window.location.pathname}${window.location.search}`;
      if (currentPath !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
      window.scrollTo(0, 0);
    }
    setCurrentPage('donate');
  };

  const galleryCardVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.65, 0, 0.35, 1],
        opacity: { duration: 0.7 },
        x: { duration: 0.7 }
      }
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        duration: 0.7,
        ease: [0.65, 0, 0.35, 1],
        opacity: { duration: 0.7 },
        x: { duration: 0.7 }
      }
    }
  };
  const campaignImageSizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';
  const buildUnsplashSrcSet = (url: string, widths = [480, 768, 1080, 1440]) =>
    widths
      .map((width) => {
        const nextUrl = new URL(url);
        nextUrl.searchParams.set('w', String(width));
        return `${nextUrl.toString()} ${width}w`;
      })
      .join(', ');
  const homeCampaignMedia: Record<string, { image: string; videoSrc?: string; imageSrcSet?: string; imageSizes?: string }> = {
    'orphan-sponsorship': { image: orphanCampaignImage },
    water: { image: waterCampaignImage, videoSrc: cloudinaryVideos.campaignWater },
    'winter-campaign': {
      image: 'https://images.unsplash.com/photo-1763123103565-def5bd258217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBjb2xkJTIwd2VhdGhlciUyMGh1bWFuaXRhcmlhbnxlbnwxfHx8fDE3Njc1MjU1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      imageSrcSet: buildUnsplashSrcSet(
        'https://images.unsplash.com/photo-1763123103565-def5bd258217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3aW50ZXIlMjBjb2xkJTIwd2VhdGhlciUyMGh1bWFuaXRhcmlhbnxlbnwxfHx8fDE3Njc1MjU1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      ),
      imageSizes: campaignImageSizes,
      videoSrc: cloudinaryVideos.campaignWinter
    }
  };
  const homeCampaigns = homeContent.campaigns.cards.map((card) => ({
    ...card,
    ...homeCampaignMedia[card.id]
  }));
  const missionCardIcons = [Heart, Users, Globe];
  const missionCardColors = ['bg-[#4A90E2]', 'bg-[#A8D5E2]', 'bg-[#F5A623]'];

  // Handle page navigation
  if (currentPage === 'family-signup') {
    return <FamilySignUpPage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }

  if (currentPage === 'sponsor-orphan') {
    return <SponsorOrphanPage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }
  
  if (currentPage === 'impact') {
    return <ImpactPage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }
  
  if (currentPage === 'donate') {
    return <DonatePage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }
  
  if (currentPage === 'contact') {
    return <ContactPage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }
  
  if (currentPage === 'mission') {
    return <MissionPage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }
  
  if (currentPage === 'campaigns') {
    return <CampaignsPage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }
  
  if (currentPage === 'gallery') {
    return <GalleryPage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }
  
  if (currentPage === 'privacy') {
    return <PrivacyPolicyPage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }
  
  if (currentPage === 'terms') {
    return <TermsOfServicePage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }

  if (currentPage === 'careers') {
    return <CareersPage onNavigate={navigateTo} language={language} onLanguageChange={handleLanguageChange} />;
  }

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={navigateTo}
          activePage={currentPage}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={navigateTo} language={language} />}
    >
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0 }}
            className="flex flex-col justify-center space-y-4 sm:space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] leading-[1.1] sm:leading-[1.05] lg:leading-[0.95] tracking-tight">
              {homeContent.hero.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-lg">
              {homeContent.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 sm:pt-4">
              <PrimaryButton
                size="md"
                className="sm:px-8 sm:py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center"
                onClick={() => navigateTo('contact')}
              >
                {homeContent.hero.ctaLabel}
              </PrimaryButton>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#A8D5E2] border-2 border-white" />
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F5A623] border-2 border-white" />
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#4A90E2] border-2 border-white" />
                </div>
                <span className="text-xs sm:text-sm text-foreground/60">{homeContent.hero.donorCount}</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              <ImpactCard 
                number={homeContent.hero.stats.totalReach.number}
                label={homeContent.hero.stats.totalReach.label}
                color={homeContent.hero.stats.totalReach.color}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            >
              <ImpactCard 
                number={homeContent.hero.stats.readyMeals.number}
                label={homeContent.hero.stats.readyMeals.label}
                color={homeContent.hero.stats.readyMeals.color}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            >
              <TextCard 
                title={homeContent.hero.stats.communityCard.title}
                description={homeContent.hero.stats.communityCard.description}
                color={homeContent.hero.stats.communityCard.color}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
            >
              <ImpactCard 
                number={homeContent.hero.stats.fundsRaised.number}
                label={homeContent.hero.stats.fundsRaised.label}
                color={homeContent.hero.stats.fundsRaised.color}
              />
            </motion.div>
          </div>
        </div>

        {/* Campaigns Section */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl tracking-tight">{homeContent.campaigns.title}</h2>
              <a href={getPathForPage('campaigns', language)} className="text-sm hover:underline" onClick={handleNavClick('campaigns')}>{homeContent.campaigns.viewAllLabel}</a>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {homeCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 + index * 0.1 }}
              >
                <CampaignCard 
                  image={campaign.image}
                  imageSrcSet={campaign.imageSrcSet}
                  imageSizes={campaign.imageSizes}
                  videoSrc={campaign.videoSrc}
                  title={campaign.title}
                  description={campaign.description}
                  goal={campaign.goal}
                  percentage={campaign.percentage}
                  primaryBadge={campaign.primaryBadge}
                  color={campaign.color}
                  donateHref={`${localizePath(actionPaths.donate, language)}?cause=${campaign.id}`}
                  onDonateClick={handleDonateWithCause(campaign.id)}
                  onCardClick={handleDonateWithCause(campaign.id)}
                  sponsorLabel={campaign.sponsorLabel}
                  sponsorHref={campaign.sponsorLabel ? localizePath(actionPaths.sponsorOrphan, language) : undefined}
                  onSponsorClick={campaign.sponsorLabel ? handleNavClick('sponsor-orphan') : undefined}
                />
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
              className="md:col-span-2"
            >
              <TextCard 
                title={homeContent.campaigns.supportCard.title}
                description={homeContent.campaigns.supportCard.description}
                color={homeContent.campaigns.supportCard.color}
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
              className="md:col-span-3 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative aspect-[16/9] -mb-6">
                <div className="absolute inset-0 rounded-b-2xl overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="https://images.unsplash.com/photo-1710092784814-4a6f158913b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxoYXBweSUyMGRvbm9ycyUyMHZvbHVudGVlcmluZ3xlbnwxfHx8fDE3Njc1MjYxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    aria-label={homeContent.campaigns.donorsFeature.videoAriaLabel}
                  >
                    <source src={cloudinaryVideos.donorsFilm} type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="bg-white p-6 pt-10 rounded-2xl">
                <h3 className="text-xl mb-2">{homeContent.campaigns.donorsFeature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {homeContent.campaigns.donorsFeature.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gallery Section */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mb-16"
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-8">
              <h2 className="text-2xl sm:text-3xl tracking-tight">{homeContent.gallery.title}</h2>
              <a
                href={getPathForPage('gallery', language)}
                className="text-xs sm:text-sm hover:underline self-end sm:self-auto"
                onClick={handleNavClick('gallery')}
              >
                {homeContent.gallery.viewAllLabel}
              </a>
            </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] overflow-hidden">
            <AnimatePresence initial={false}>
              {!showWideCard ? (
                <motion.div
                  key="grid"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.7
                      }
                    },
                    exit: {
                      transition: {
                        staggerChildren: 0.12
                      }
                    }
                  }}
                  className="grid md:grid-cols-4 gap-6 h-full absolute w-full"
                >
                  <motion.div
                    variants={galleryCardVariants}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
                  >
                    <div className="h-full overflow-hidden">
                      <video
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={homeContent.gallery.gridLabels[0]}
                      >
                        <source src={cloudinaryVideos.homeGalleryTikiya} type="video/mp4" />
                      </video>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={galleryCardVariants}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
                  >
                    <div className="h-full overflow-hidden">
                      <video
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={homeContent.gallery.gridLabels[1]}
                      >
                        <source src={cloudinaryVideos.homeGalleryWater2} type="video/mp4" />
                      </video>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={galleryCardVariants}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
                  >
                    <div className="h-full overflow-hidden">
                      <video
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={homeContent.gallery.gridLabels[2]}
                      >
                        <source src={cloudinaryVideos.homeGalleryWaterDistribute} type="video/mp4" />
                      </video>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={galleryCardVariants}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
                  >
                    <div className="h-full overflow-hidden">
                      <video
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={homeContent.gallery.gridLabels[3]}
                      >
                        <source src={cloudinaryVideos.homeGalleryWinterCampaign} type="video/mp4" />
                      </video>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="wide"
                  initial={{ x: "100%", opacity: 1 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: { duration: 1.1, ease: [0.65, 0, 0.2, 1], delay: 0.36 }
                  }}
                  exit={{
                    x: "-100%",
                    opacity: 1,
                    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] }
                  }}
                  className="w-full h-full absolute"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-full">
                    <div className="h-full overflow-hidden relative">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={homeContent.gallery.feature.videoAriaLabel}
                      >
                        <source src={cloudinaryVideos.homeGalleryFeature} type="video/mp4" />
                      </video>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 sm:p-8 lg:p-12">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-2 sm:mb-3 tracking-tight">{homeContent.gallery.feature.title}</h3>
                        <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
                          {homeContent.gallery.feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* About Section */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl tracking-tight">{homeContent.about.title}</h2>
              <a
                href={getPathForPage('mission', language)}
                className="text-xs sm:text-sm hover:underline hidden sm:inline"
                onClick={handleNavClick('mission')}
              >
                {homeContent.about.viewMissionLabel}
              </a>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="md:col-span-2 bg-white rounded-2xl p-10 shadow-sm"
            >
              <div className="inline-block px-4 py-1.5 bg-[#e1a226]/10 text-[#e1a226] rounded-full text-sm mb-6">
                {homeContent.about.sinceBadge}
              </div>
              <h3 className="text-3xl tracking-tight mb-6">
                {homeContent.about.cardTitle}
              </h3>
              {homeContent.about.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={`text-foreground/70 leading-relaxed ${index === 0 ? 'mb-4' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            >
              <ImpactCard 
                number={homeContent.about.stats.yearsOfService.number}
                label={homeContent.about.stats.yearsOfService.label}
                color={homeContent.about.stats.yearsOfService.color}
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            >
              <ImpactCard 
                number={homeContent.about.stats.localPartners.number}
                label={homeContent.about.stats.localPartners.label}
                color={homeContent.about.stats.localPartners.color}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
            >
              <ImpactCard 
                number={homeContent.about.stats.volunteers.number}
                label={homeContent.about.stats.volunteers.label}
                color={homeContent.about.stats.volunteers.color}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h4 className="text-xl mb-3">{homeContent.about.stats.valuesCard.title}</h4>
              <ul className="space-y-3 text-sm text-foreground/70 leading-relaxed">
                {homeContent.about.stats.valuesCard.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Mission Cards */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {homeContent.missionCards.map((card, index) => {
              const Icon = missionCardIcons[index];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.15 }}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  <div className={`w-12 h-12 ${missionCardColors[index]} rounded-xl flex items-center justify-center mb-4`}>
                    {Icon ? <Icon className="w-6 h-6 text-white" /> : null}
                  </div>
                  <h3 className="text-xl mb-3">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Subscribe Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="grid md:grid-cols-5 gap-6 mt-16"
        >
          <div className="md:col-span-2 bg-[#2D9CDB] rounded-2xl p-10 flex flex-col justify-center">
            <h2 className="text-3xl tracking-tight mb-4 text-white">{homeContent.subscribe.title}</h2>
            <p className="text-white/90 leading-relaxed">
              {homeContent.subscribe.description}
            </p>
          </div>
          <div className="md:col-span-3 bg-white rounded-2xl p-10 shadow-sm flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder={homeContent.subscribe.inputPlaceholder}
                className="flex-1 px-5 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1a226] focus:border-transparent"
              />
              <button className="bg-[#e1a226] text-white px-8 py-3 rounded-lg hover:bg-[#c78f1f] transition-colors whitespace-nowrap">
                {homeContent.subscribe.buttonLabel}
              </button>
            </div>
            <p className="text-xs text-foreground/50 mt-4">
              {homeContent.subscribe.helperText}
            </p>
          </div>
        </motion.div>
    </PageLayout>
  );
}
