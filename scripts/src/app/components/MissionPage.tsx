import { Heart, Users, Target, Eye, Compass, Shield, Lightbulb, HandHeart, Droplet } from 'lucide-react';
import { ImpactCard } from './ImpactCard';
import { motion } from 'motion/react';
import type { PageKey } from '../routes';
import { content } from '../../content';
import { PageLayout } from './PageLayout';
import { RelatedLinks } from './RelatedLinks';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface MissionPageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

export function MissionPage({ onNavigate, language, onLanguageChange }: MissionPageProps) {
  const missionContent = content.mission;
  const navLabelMap = new Map(content.header.navItems.map((item) => [item.key as PageKey, item.label]));
  const relatedLinks = [
    { key: 'impact', label: navLabelMap.get('impact') ?? 'Impact' },
    { key: 'campaigns', label: navLabelMap.get('campaigns') ?? 'Campaigns' }
  ];

  const coreValues = [
    {
      icon: Heart,
      title: missionContent.coreValues.items[0].title,
      description: missionContent.coreValues.items[0].description,
      color: "bg-[#4A90E2]"
    },
    {
      icon: Shield,
      title: missionContent.coreValues.items[1].title,
      description: missionContent.coreValues.items[1].description,
      color: "bg-[#A8D5E2]"
    },
    {
      icon: Lightbulb,
      title: missionContent.coreValues.items[2].title,
      description: missionContent.coreValues.items[2].description,
      color: "bg-[#F5A623]"
    },
    {
      icon: HandHeart,
      title: missionContent.coreValues.items[3].title,
      description: missionContent.coreValues.items[3].description,
      color: "bg-[#e1a226]"
    }
  ];

  const impactAreas = [
    {
      icon: HandHeart,
      title: missionContent.impactAreas.items[0].title,
      description: missionContent.impactAreas.items[0].description,
      stats: missionContent.impactAreas.items[0].stats
    },
    {
      icon: Users,
      title: missionContent.impactAreas.items[1].title,
      description: missionContent.impactAreas.items[1].description,
      stats: missionContent.impactAreas.items[1].stats
    },
    {
      icon: Droplet,
      title: missionContent.impactAreas.items[2].title,
      description: missionContent.impactAreas.items[2].description,
      stats: missionContent.impactAreas.items[2].stats
    },
    {
      icon: Heart,
      title: missionContent.impactAreas.items[3].title,
      description: missionContent.impactAreas.items[3].description,
      stats: missionContent.impactAreas.items[3].stats
    }
  ];

  const timeline = [
    {
      year: missionContent.journey.items[0].year,
      title: missionContent.journey.items[0].title,
      description: missionContent.journey.items[0].description,
      color: "bg-[#4A90E2]"
    },
    {
      year: missionContent.journey.items[1].year,
      title: missionContent.journey.items[1].title,
      description: missionContent.journey.items[1].description,
      color: "bg-[#A8D5E2]"
    },
    {
      year: missionContent.journey.items[2].year,
      title: missionContent.journey.items[2].title,
      description: missionContent.journey.items[2].description,
      color: "bg-[#F5A623]"
    },
    {
      year: missionContent.journey.items[3].year,
      title: missionContent.journey.items[3].title,
      description: missionContent.journey.items[3].description,
      color: "bg-[#e1a226]"
    },
    {
      year: missionContent.journey.items[4].year,
      title: missionContent.journey.items[4].title,
      description: missionContent.journey.items[4].description,
      color: "bg-[#4A90E2]"
    },
    {
      year: missionContent.journey.items[5].year,
      title: missionContent.journey.items[5].title,
      description: missionContent.journey.items[5].description,
      color: "bg-[#A8D5E2]"
    }
  ];
  const statsColors = ['bg-[#4A90E2]', 'bg-[#A8D5E2]', 'bg-[#F5A623]', 'bg-[#e1a226]'];
  const stats = missionContent.stats.items.map((item, index) => ({
    ...item,
    color: statsColors[index] ?? 'bg-[#4A90E2]'
  }));

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="mission"
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
              <Target className="w-5 h-5 text-[#e1a226]" />
              <span className="text-sm font-medium text-[#e1a226]">{missionContent.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              {missionContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {missionContent.hero.description}
            </p>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="bg-[#4A90E2] rounded-2xl p-8 sm:p-12 text-white"
          >
            <Eye className="w-12 h-12 mb-6" />
            <h2 className="text-3xl sm:text-4xl tracking-tight mb-4">{missionContent.vision.title}</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              {missionContent.vision.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="bg-[#A8D5E2] rounded-2xl p-8 sm:p-12 text-white"
          >
            <Compass className="w-12 h-12 mb-6" />
            <h2 className="text-3xl sm:text-4xl tracking-tight mb-4">{missionContent.approach.title}</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              {missionContent.approach.description}
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              {missionContent.coreValues.title}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {missionContent.coreValues.description}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-black/5"
              >
                <div className={`${value.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Areas */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              {missionContent.impactAreas.title}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {missionContent.impactAreas.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {impactAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-black/5"
              >
                <area.icon className="w-10 h-10 text-[#e1a226] mb-4" />
                <h3 className="text-2xl font-medium mb-3">{area.title}</h3>
                <p className="text-foreground/70 leading-relaxed mb-4">{area.description}</p>
                <div className="inline-flex items-center gap-2 bg-[#e1a226]/10 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-[#e1a226]">{area.stats}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              {missionContent.journey.title}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {missionContent.journey.description}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-black/10"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left`}>
                    <div className={`bg-white rounded-2xl p-8 border border-black/5 inline-block ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} w-full md:max-w-md`}>
                      <div className={`inline-flex items-center gap-2 ${item.color} text-white px-4 py-2 rounded-full mb-4`}>
                        <span className="text-sm font-medium">{item.year}</span>
                      </div>
                      <h3 className="text-2xl font-medium mb-3">{item.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:block relative flex-shrink-0">
                    <div className={`w-4 h-4 ${item.color} rounded-full border-4 border-white shadow-lg`}></div>
                  </div>
                  
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              {missionContent.stats.title}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {missionContent.stats.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 + index * 0.1 }}
              >
                <ImpactCard 
                  number={stat.number}
                  label={stat.label}
                  color={stat.color}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-gradient-to-br from-[#e1a226] to-[#F5A623] rounded-2xl p-8 sm:p-12 lg:p-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 text-white">
            {missionContent.cta.title}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {missionContent.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#e1a226] px-8 py-4 rounded-full hover:bg-white/90 transition-colors text-lg font-medium" onClick={() => onNavigate?.('donate')}>
              {missionContent.cta.primaryButton}
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-lg font-medium">
              {missionContent.cta.secondaryButton}
            </button>
          </div>
        </motion.div>
        <RelatedLinks links={relatedLinks} onNavigate={onNavigate} language={language} />
    </PageLayout>
  );
}
