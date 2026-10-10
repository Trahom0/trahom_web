import { TrendingUp, Users, Heart, Droplets, Building2, Award, Globe, Calendar, DollarSign, Target } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { cloudinaryVideos } from '../cloudinary';
import type { PageKey } from '../routes';
import { content } from '../../content';
import { formatTemplate } from '../../content/utils';
import { PageLayout } from './PageLayout';
import { RelatedLinks } from './RelatedLinks';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface ImpactPageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

export function ImpactPage({ onNavigate, language, onLanguageChange }: ImpactPageProps) {
  const impactContent = content.impact;
  const navLabelMap = new Map(content.header.navItems.map((item) => [item.key as PageKey, item.label]));
  const relatedLinks = [
    { key: 'mission', label: navLabelMap.get('mission') ?? 'Mission' },
    { key: 'campaigns', label: navLabelMap.get('campaigns') ?? 'Campaigns' }
  ];
  const [selectedYear, setSelectedYear] = useState('2025');

  const impactStats = [
    { ...impactContent.stats.items[0], icon: Users, color: 'bg-[#e1a226]' },
    { ...impactContent.stats.items[1], icon: DollarSign, color: 'bg-[#4A90E2]' },
    { ...impactContent.stats.items[2], icon: Heart, color: 'bg-[#A8D5E2]' },
    { ...impactContent.stats.items[3], icon: Target, color: 'bg-[#F5A623]' },
    { ...impactContent.stats.items[4], icon: Droplets, color: 'bg-[#e1a226]' },
    { ...impactContent.stats.items[5], icon: Building2, color: 'bg-[#4A90E2]' }
  ];

  const impactByCategory = [
    { ...impactContent.programs.categories[0], icon: Heart, color: 'bg-[#4A90E2]' },
    { ...impactContent.programs.categories[1], icon: Users, color: 'bg-[#A8D5E2]' },
    { ...impactContent.programs.categories[2], icon: Droplets, color: 'bg-[#F5A623]' },
    { ...impactContent.programs.categories[3], icon: Building2, color: 'bg-[#e1a226]' },
    { ...impactContent.programs.categories[4], icon: Target, color: 'bg-[#4A90E2]' }
  ];

  type SuccessStory = {
    name: string;
    age: number;
    country: string;
    story: string;
    category: string;
    image?: string;
    videoSrc?: string;
  };

  const successStories: SuccessStory[] = [
    {
      ...impactContent.stories.items[0],
      videoSrc: cloudinaryVideos.impactInterviewOne
    },
    {
      ...impactContent.stories.items[1],
      videoSrc: cloudinaryVideos.impactInterviewTwo
    }
  ];

  const yearlyProgress = impactContent.growth.items;

  const financialBreakdown = impactContent.financial.breakdown.map((item, index) => ({
    ...item,
    color: ['bg-[#e1a226]', 'bg-[#4A90E2]', 'bg-[#A8D5E2]'][index] ?? 'bg-[#e1a226]'
  }));

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="impact"
          language={language}
          onLanguageChange={onLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >
        {/* Hero Section */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#e1a226]/10 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5 text-[#e1a226]" />
              <span className="text-sm font-medium text-[#e1a226]">{impactContent.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              {impactContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {impactContent.hero.description}
            </p>
          </motion.div>
        </div>

        {/* Key Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 sm:mb-24">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-black/5 text-center"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-medium mb-2">{stat.number}</div>
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Impact by Category */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              {impactContent.programs.title}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {impactContent.programs.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {impactByCategory.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-black/5"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-medium">{category.category}</h3>
                  </div>
                  <p className="text-foreground/70 mb-6 leading-relaxed">{category.impact}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {category.stats.map((stat) => (
                      <div key={stat.label} className="bg-[#f9fbff] rounded-xl p-4">
                        <div className="text-2xl font-medium mb-1">{stat.value}</div>
                        <p className="text-sm text-foreground/60">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              {impactContent.stories.title}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {impactContent.stories.description}
            </p>
          </motion.div>

          <div className={`grid gap-6 ${successStories.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-black/5"
              >
                <div className="aspect-square overflow-hidden">
                  {story.videoSrc ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={formatTemplate(impactContent.stories.imageAltTemplate, { name: story.name })}
                    >
                      <source src={story.videoSrc} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={story.image} 
                      alt={formatTemplate(impactContent.stories.imageAltTemplate, { name: story.name })}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium">
                        {formatTemplate(impactContent.stories.nameAgeTemplate, {
                          name: story.name,
                          age: story.age
                        })}
                      </h3>
                      <p className="text-sm text-foreground/60">{story.country}</p>
                    </div>
                    <div className="bg-[#e1a226]/10 text-[#e1a226] text-xs px-3 py-1 rounded-full">
                      {story.category}
                    </div>
                  </div>
                  <p className="text-foreground/70 leading-relaxed italic">
                    {formatTemplate(impactContent.stories.quoteTemplate, { story: story.story })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Yearly Progress (shown only when yearly figures are provided) */}
        {yearlyProgress.length > 0 && (
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="bg-gradient-to-br from-[#4A90E2] to-[#A8D5E2] rounded-2xl p-8 sm:p-12 text-white"
          >
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-8 h-8" />
              <h2 className="text-3xl sm:text-4xl tracking-tight">{impactContent.growth.title}</h2>
            </div>
            <div
              className={`grid grid-cols-1 gap-6 ${
                yearlyProgress.length === 1
                  ? 'md:grid-cols-1'
                  : yearlyProgress.length === 2
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-3'
              }`}
            >
              {yearlyProgress.map((year, index) => (
                <div 
                  key={year.year}
                  className={`bg-white/10 backdrop-blur rounded-xl p-6 ${
                    year.year === selectedYear ? 'ring-2 ring-white' : ''
                  }`}
                >
                  <div className="text-2xl font-medium mb-6">{year.year}</div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/70 text-sm mb-1">{impactContent.growth.labels.totalReach}</p>
                      <p className="text-3xl font-medium">{year.lives}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">{impactContent.growth.labels.readyMeals}</p>
                      <p className="text-2xl font-medium">{year.projects}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/20">
                      <div>
                        <p className="text-white/70 text-xs mb-1">{impactContent.growth.labels.cleanWater}</p>
                        <p className="text-xl font-medium">{year.countries}</p>
                      </div>
                      <div>
                        <p className="text-white/70 text-xs mb-1">{impactContent.growth.labels.totalFunds}</p>
                        <p className="text-xl font-medium">{year.funds}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        )}

        {/* Financial Transparency */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white rounded-2xl p-8 sm:p-12 border border-black/5"
          >
            <div className="flex items-center gap-3 mb-8">
              <DollarSign className="w-8 h-8 text-[#e1a226]" />
              <h2 className="text-3xl sm:text-4xl tracking-tight">{impactContent.financial.title}</h2>
            </div>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              {impactContent.financial.description}
            </p>
            <div className="space-y-6">
              {financialBreakdown.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-2xl font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#f9fbff] rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                      className={`${item.color} h-full rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-[#e1a226] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium mb-1">{impactContent.financial.highlights[0].title}</p>
                  <p className="text-sm text-foreground/60">{impactContent.financial.highlights[0].description}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-[#4A90E2] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium mb-1">{impactContent.financial.highlights[1].title}</p>
                  <p className="text-sm text-foreground/60">{impactContent.financial.highlights[1].description}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-6 h-6 text-[#A8D5E2] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium mb-1">{impactContent.financial.highlights[2].title}</p>
                  <p className="text-sm text-foreground/60">{impactContent.financial.highlights[2].description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-gradient-to-br from-[#e1a226] to-[#c78f1f] rounded-2xl p-8 sm:p-12 text-white text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            {impactContent.cta.title}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {impactContent.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white text-[#e1a226] px-8 py-4 rounded-full hover:bg-white/90 transition-colors text-lg font-medium"
              onClick={() => onNavigate?.('donate')}
            >
              {impactContent.cta.primaryButton}
            </button>
            <button 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-lg font-medium"
              onClick={() => onNavigate?.('campaigns')}
            >
              {impactContent.cta.secondaryButton}
            </button>
          </div>
        </motion.div>
        <RelatedLinks links={relatedLinks} onNavigate={onNavigate} language={language} />
    </PageLayout>
  );
}
