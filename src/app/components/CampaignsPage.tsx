import { Filter } from 'lucide-react';
import { CampaignCard } from './CampaignCard';
import { ImpactCard } from './ImpactCard';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import orphanCampaignImage from '../../assets/homepage-card-orphan-campaign.jpg';
import waterCampaignImage from '../../assets/homepage-card-water.png';
import { actionPaths, localizePath, pagePaths, type LanguageCode, type PageKey } from '../routes';
import { cloudinaryVideos } from '../cloudinary';
import { content } from '../../content';
import { PageLayout } from './PageLayout';
import { RelatedLinks } from './RelatedLinks';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface CampaignsPageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

export function CampaignsPage({ onNavigate, language, onLanguageChange }: CampaignsPageProps) {
  const campaignsContent = content.campaigns;
  const [selectedCategory, setSelectedCategory] = useState(campaignsContent.filter.allLabel);
  const navLabelMap = new Map(content.header.navItems.map((item) => [item.key as PageKey, item.label]));
  const relatedLinks = [
    { key: 'mission', label: navLabelMap.get('mission') ?? 'Mission' },
    { key: 'impact', label: navLabelMap.get('impact') ?? 'Impact' }
  ];
  const campaignImageSizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';
  const buildUnsplashSrcSet = (url: string, widths = [480, 768, 1080, 1440]) =>
    widths
      .map((width) => {
        const nextUrl = new URL(url);
        nextUrl.searchParams.set('w', String(width));
        return `${nextUrl.toString()} ${width}w`;
      })
      .join(', ');

  const handleNavClick = (page: PageKey) => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onNavigate?.(page);
  };

  const campaignMedia: Record<string, { image: string; videoSrc?: string; imageSrcSet?: string; imageSizes?: string }> = {
    'orphan-sponsorship': { image: orphanCampaignImage },
    water: { image: waterCampaignImage, videoSrc: cloudinaryVideos.campaignWater },
    'winter-campaign': {
      image: 'https://images.unsplash.com/photo-1763123103565-def5bd258217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBjb2xkJTIwd2VhdGhlciUyMGh1bWFuaXRhcmlhbnxlbnwxfHx8fDE3Njc1MjU1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      imageSrcSet: buildUnsplashSrcSet(
        'https://images.unsplash.com/photo-1763123103565-def5bd258217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBjb2xkJTIwd2VhdGhlciUyMGh1bWFuaXRhcmlhbnxlbnwxfHx8fDE3Njc1MjU1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      ),
      imageSizes: campaignImageSizes,
      videoSrc: cloudinaryVideos.campaignWinter
    },
    'food-security': {
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwaHVtYW5pdGFyaWFufGVufDF8fHx8MTc2NzUyNjE0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      imageSrcSet: buildUnsplashSrcSet(
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwaHVtYW5pdGFyaWFufGVufDF8fHx8MTc2NzUyNjE0MXww&ixlib=rb-4.1.0&q=80&w=1080'
      ),
      imageSizes: campaignImageSizes,
      videoSrc: cloudinaryVideos.campaignFood
    }
  };
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    for (const campaign of campaignsContent.items) {
      const category = campaign.category?.trim();
      if (category) {
        uniqueCategories.add(category);
      }
    }
    return [campaignsContent.filter.allLabel, ...uniqueCategories];
  }, [campaignsContent.items, campaignsContent.filter.allLabel]);

  const filteredCampaigns = useMemo(() => {
    if (selectedCategory === campaignsContent.filter.allLabel) {
      return campaignsContent.items;
    }
    return campaignsContent.items.filter(
      (campaign) => campaign.category?.trim() === selectedCategory
    );
  }, [campaignsContent.items, campaignsContent.filter.allLabel, selectedCategory]);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory(campaignsContent.filter.allLabel);
    }
  }, [categories, campaignsContent.filter.allLabel, selectedCategory]);

  const handleDonateWithCause = (cause: string) => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const nextPath = `${localizePath(pagePaths.donate, (language ?? 'EN') as LanguageCode)}?cause=${encodeURIComponent(cause)}`;
    onNavigate?.('donate');
    if (typeof window !== 'undefined') {
      const currentPath = `${window.location.pathname}${window.location.search}`;
      if (currentPath !== nextPath) {
        window.history.replaceState({}, '', nextPath);
      }
      window.scrollTo(0, 0);
    }
  };

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="campaigns"
          language={language}
          onLanguageChange={onLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >
        {/* Hero Section */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-3 sm:mb-4 px-4">
              {campaignsContent.hero.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed px-4">
              {campaignsContent.hero.description}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <ImpactCard 
                number={String(filteredCampaigns.length)}
                label={campaignsContent.stats.activeLabel}
                color="bg-[#4A90E2]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              <ImpactCard 
                number={campaignsContent.stats.totalRaised.number}
                label={campaignsContent.stats.totalRaised.label}
                color="bg-[#A8D5E2]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            >
              <ImpactCard 
                number={campaignsContent.stats.activeDonors.number}
                label={campaignsContent.stats.activeDonors.label}
                color="bg-[#F5A623]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            >
              <ImpactCard 
                number={campaignsContent.stats.peopleHelped.number}
                label={campaignsContent.stats.peopleHelped.label}
                color="bg-[#e1a226]"
              />
            </motion.div>
          </div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-foreground/60" />
            <h2 className="text-lg font-medium">{campaignsContent.filter.title}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full border transition-all ${
                  selectedCategory === category
                    ? 'bg-[#e1a226] text-white border-[#e1a226]'
                    : 'bg-white text-foreground/70 border-black/10 hover:border-[#e1a226] hover:text-[#e1a226]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Campaigns Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredCampaigns.map((campaign, index) => {
            const { sponsorCta, id, category: _category, ...cardProps } = campaign;
            const media = campaignMedia[id] ?? { image: orphanCampaignImage };
            const causeId = id;
            return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
            >
              <CampaignCard
                {...cardProps}
                image={media.image}
                imageSrcSet={media.imageSrcSet}
                imageSizes={media.imageSizes}
                videoSrc={media.videoSrc}
                donateHref={
                  causeId
                    ? `${localizePath(actionPaths.donate, (language ?? 'EN') as LanguageCode)}?cause=${encodeURIComponent(causeId)}`
                    : localizePath(actionPaths.donate, (language ?? 'EN') as LanguageCode)
                }
                onDonateClick={causeId ? handleDonateWithCause(causeId) : handleNavClick('donate')}
                onCardClick={causeId ? handleDonateWithCause(causeId) : handleNavClick('donate')}
                sponsorLabel={sponsorCta ? content.shared.campaignCard.sponsorLabel : undefined}
                sponsorHref={sponsorCta ? localizePath(actionPaths.sponsorOrphan, (language ?? 'EN') as LanguageCode) : undefined}
                onSponsorClick={sponsorCta ? handleNavClick('sponsor-orphan') : undefined}
              />
            </motion.div>
          );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-[#2D9CDB] rounded-2xl p-8 sm:p-12 lg:p-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 text-white">
            {campaignsContent.cta.title}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {campaignsContent.cta.description}
          </p>
          <button
            type="button"
            className="bg-white text-[#2D9CDB] px-8 py-4 rounded-full hover:bg-white/90 transition-colors text-lg font-medium"
            onClick={handleNavClick('donate')}
          >
            {campaignsContent.cta.buttonLabel}
          </button>
        </motion.div>
        <RelatedLinks links={relatedLinks} onNavigate={onNavigate} language={language} />
    </PageLayout>
  );
}
