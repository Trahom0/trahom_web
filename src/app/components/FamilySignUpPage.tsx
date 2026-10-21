import { Users } from 'lucide-react';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import type { PageKey } from '../routes';
import { content } from '../../content';
import { PageLayout } from './PageLayout';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface FamilySignUpPageProps {
  onNavigate?: (page: PageKey) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

const TALLY_FORM_URL = 'https://tally.so/r/mJ48jJ';

export function FamilySignUpPage({ onNavigate, language, onLanguageChange }: FamilySignUpPageProps) {
  const familyContent = content.familySignup;

  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <PageLayout
      className="flex flex-col"
      useMainWrapper={false}
      header={
        <SiteHeader
          onNavigate={onNavigate}
          activePage="family-signup"
          language={language}
          onLanguageChange={onLanguageChange}
        />
      }
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >

      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#e1a226]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[#e1a226]" />
            <span className="text-xs sm:text-sm font-medium text-[#e1a226]">{familyContent.hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight">
            {familyContent.hero.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6">
            {familyContent.hero.description}
          </p>
          {/* Uploading certificates works best in a full page on phones, so the form can also be opened directly. */}
          <a
            href={TALLY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#103b51] px-5 py-2.5 text-sm sm:text-base text-white hover:bg-[#0c2e40] transition-colors"
          >
            {familyContent.openFullPageLabel}
          </a>
          <p className="text-xs sm:text-sm text-foreground/60 max-w-2xl mx-auto mt-3">{familyContent.uploadTip}</p>
        </motion.div>
      </div>

      {/* Tally Form Embed */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="bg-white rounded-2xl border border-black/5 overflow-visible"
        >
          {/* Fixed height (no dynamicHeight): when the embed resized itself, adding a photo of a
              certificate could leave the "Next" button cut off below the frame. */}
          <iframe
            data-tally-src={`${TALLY_FORM_URL}?transparentBackground=1`}
            width="100%" 
            height="2000"
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0} 
            title={familyContent.iframeTitle}
            style={{ border: 0 }}
          />
        </motion.div>
      </div>

    </PageLayout>
  );
}
