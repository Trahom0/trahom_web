import type { MouseEvent } from 'react';
import { content } from '../../content';
import { getPathForPage, isPlainLeftClick, type LanguageCode, type PageKey } from '../routes';
import { PageLayout } from './PageLayout';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface NotFoundPageProps {
  onNavigate: (page: PageKey) => void;
  language: LanguageCode;
  onLanguageChange?: (language: string) => void;
}

export function NotFoundPage({ onNavigate, language, onLanguageChange }: NotFoundPageProps) {
  const text = content.shared.notFound;
  const go = (page: PageKey) => (event: MouseEvent) => {
    if (!isPlainLeftClick(event)) {
      return;
    }
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <PageLayout
      header={<SiteHeader onNavigate={onNavigate} language={language} onLanguageChange={onLanguageChange} />}
      footer={<SiteFooter onNavigate={onNavigate} language={language} />}
    >
      <section className="max-w-2xl mx-auto text-center py-16 sm:py-24 flex flex-col items-center gap-6">
        <p className="text-6xl sm:text-7xl font-bold text-[#e1a226]" aria-hidden="true">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl tracking-tight">{text.title}</h1>
        <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">{text.description}</p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={getPathForPage('home', language)}
            onClick={go('home')}
            className="rounded-full bg-[#103b51] text-white px-6 py-3 hover:bg-[#0a2a3b] transition-colors"
          >
            {text.homeLabel}
          </a>
          <a
            href={getPathForPage('donate', language)}
            onClick={go('donate')}
            className="rounded-full bg-[#e1a226] text-[#0a2a3b] px-6 py-3 hover:bg-[#c78f1f] transition-colors"
          >
            {text.donateLabel}
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
