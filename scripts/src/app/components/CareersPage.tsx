import { motion } from 'motion/react';
import type { PageKey } from '../routes';
import { content } from '../../content';
import { PageLayout } from './PageLayout';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface CareersPageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

export function CareersPage({ onNavigate, language, onLanguageChange }: CareersPageProps) {
  const careersContent = content.careers;

  return (
    <PageLayout
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="careers"
          language={language}
          onLanguageChange={onLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
      mainClassName="py-12 sm:py-16 lg:py-20"
    >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-[900px] mx-auto"
        >
            <div className="rounded-3xl overflow-hidden border border-black/5 shadow-sm bg-white">
              <div className="bg-[#4A90E2] px-8 py-10 sm:px-12 sm:py-12 text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight">
                  {careersContent.title}
                </h1>
              </div>
              <div className="px-8 py-10 sm:px-12 sm:py-12 text-center">
                <p className="text-lg sm:text-xl text-foreground/70">
                  {careersContent.emptyState}
                </p>
              </div>
            </div>
        </motion.div>
    </PageLayout>
  );
}
