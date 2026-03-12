import { BookOpen, Shield, CreditCard, CheckCircle, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import type { PageKey } from '../routes';
import { content } from '../../content';
import { PageLayout } from './PageLayout';
import { RelatedLinks } from './RelatedLinks';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface TermsOfServicePageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

export function TermsOfServicePage({ onNavigate, language, onLanguageChange }: TermsOfServicePageProps) {
  const termsContent = content.terms;
  const navLabelMap = new Map(content.header.navItems.map((item) => [item.key as PageKey, item.label]));
  const relatedLinks = [
    { key: 'mission', label: navLabelMap.get('mission') ?? 'Mission' },
    { key: 'campaigns', label: navLabelMap.get('campaigns') ?? 'Campaigns' },
    { key: 'impact', label: navLabelMap.get('impact') ?? 'Impact' }
  ];
  const highlights = [
    { ...termsContent.highlights[0], icon: BookOpen },
    { ...termsContent.highlights[1], icon: Shield },
    { ...termsContent.highlights[2], icon: CreditCard }
  ];
  const keyPoints = termsContent.keyPoints.items;
  const termsSections = termsContent.sections;

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="terms"
          language={language}
          onLanguageChange={onLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#e1a226]/10 px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-5 h-5 text-[#e1a226]" />
              <span className="text-sm font-medium text-[#e1a226]">{termsContent.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              {termsContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {termsContent.hero.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-foreground/50">
              <span className="px-3 py-1 rounded-full bg-white border border-black/5">{termsContent.hero.meta.updated}</span>
              <span className="px-3 py-1 rounded-full bg-white border border-black/5">{termsContent.hero.meta.contact}</span>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: index * 0.05 }}
                className="bg-white border border-black/5 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e1a226]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#e1a226]" />
                </div>
                <h3 className="text-xl mb-2">{highlight.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{highlight.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-white border border-black/5 rounded-2xl p-6 sm:p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-[#e1a226]" />
            <h2 className="text-xl">{termsContent.keyPoints.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-foreground/70">
            {keyPoints.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#e1a226] mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {termsSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: index * 0.04 }}
              className="bg-white border border-black/5 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl mb-3">{section.title}</h3>
              <ul className="space-y-3 text-sm text-foreground/70 leading-relaxed">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#e1a226] mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mt-12 bg-[#e1a226] text-white rounded-2xl p-8 sm:p-10 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.2em] text-white/70 mb-3">
            <Globe className="w-4 h-4" />
            {termsContent.cta.eyebrow}
          </div>
          <h2 className="text-2xl sm:text-3xl tracking-tight mb-3">{termsContent.cta.title}</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-6">
            {termsContent.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white text-[#e1a226] px-6 py-3 rounded-full hover:bg-white/90 transition-colors font-medium"
              onClick={() => onNavigate?.('contact')}
            >
              {termsContent.cta.primaryButton}
            </button>
            <button
              className="border border-white text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors font-medium"
              onClick={() => onNavigate?.('privacy')}
            >
              {termsContent.cta.secondaryButton}
            </button>
          </div>
        </motion.div>
        <RelatedLinks links={relatedLinks} onNavigate={onNavigate} language={language} />
    </PageLayout>
  );
}
