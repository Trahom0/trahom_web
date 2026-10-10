import type { PageKey, LanguageCode } from '../routes';
import { getPathForPage, isPlainLeftClick } from '../routes';
import { content } from '../../content';

interface RelatedLinksProps {
  links: Array<{ key: PageKey; label: string }>;
  onNavigate?: (page: PageKey) => void;
  language?: string;
}

export function RelatedLinks({ links, onNavigate, language }: RelatedLinksProps) {
  const sharedContent = content.shared.relatedLinks;
  const activeLanguage = (language ?? 'EN') as LanguageCode;

  const handleNavClick = (page: PageKey) => (event: { preventDefault: () => void }) => {
    if (!isPlainLeftClick(event)) {
      return;
    }
    if (!onNavigate) {
      return;
    }
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <section className="mt-12 sm:mt-16">
      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl tracking-tight mb-3">
          {sharedContent.title}
        </h2>
        <p className="text-foreground/70 mb-6 leading-relaxed">
          {sharedContent.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.key}
              href={getPathForPage(link.key, activeLanguage)}
              onClick={handleNavClick(link.key)}
              className="inline-flex items-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-[#e1a226] hover:border-[#e1a226] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
