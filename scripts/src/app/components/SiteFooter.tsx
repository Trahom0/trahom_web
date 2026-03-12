import { Mail, MapPin, Phone } from 'lucide-react';
import logoImage from '../../assets/logo and qr code.svg';
import { content } from '../../content';
import { actionPaths, getPathForPage, localizePath, type LanguageCode, type PageKey } from '../routes';
import { SocialLinks } from './SocialLinks';

type SiteFooterProps = {
  onNavigate?: (page: PageKey) => void;
  language?: string;
};

export function SiteFooter({ onNavigate, language }: SiteFooterProps) {
  const footerContent = content.footer;
  const activeLanguage = (language ?? 'EN') as LanguageCode;

  const handleNavClick = (page: PageKey) => (event: { preventDefault: () => void }) => {
    if (!onNavigate) {
      return;
    }
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="bg-[#FAF9FB] border-t border-black/5 mt-16">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src={logoImage} alt={footerContent.logoAlt} className="h-12 w-auto" />
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed">
              {footerContent.tagline}
            </p>
          </div>
          <div>
            <h4 className="mb-4">{footerContent.sections.about.title}</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href={getPathForPage('mission', activeLanguage)} className="hover:text-foreground transition-colors" onClick={handleNavClick('mission')}>{footerContent.sections.about.links.mission}</a></li>
              <li><a href={getPathForPage('impact', activeLanguage)} className="hover:text-foreground transition-colors" onClick={handleNavClick('impact')}>{footerContent.sections.about.links.impact}</a></li>
              
              <li><a href={getPathForPage('careers', activeLanguage)} className="hover:text-foreground transition-colors" onClick={handleNavClick('careers')}>{footerContent.sections.about.links.careers}</a></li>
              <li><a href={getPathForPage('family-signup', activeLanguage)} className="hover:text-[#e1a226] transition-colors" onClick={handleNavClick('family-signup')}>{footerContent.sections.about.links.familySignup}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">{footerContent.sections.getInvolved.title}</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href={localizePath(actionPaths.donate, activeLanguage)} className="hover:text-foreground transition-colors" onClick={handleNavClick('donate')}>{footerContent.sections.getInvolved.links.donate}</a></li>
              <li><a href={localizePath(actionPaths.volunteer, activeLanguage)} className="hover:text-foreground transition-colors" onClick={handleNavClick('contact')}>{footerContent.sections.getInvolved.links.volunteer}</a></li>
              <li><a href={localizePath(actionPaths.fundraise, activeLanguage)} className="hover:text-foreground transition-colors" onClick={handleNavClick('contact')}>{footerContent.sections.getInvolved.links.fundraise}</a></li>
              <li><a href={localizePath(actionPaths.partner, activeLanguage)} className="hover:text-foreground transition-colors" onClick={handleNavClick('contact')}>{footerContent.sections.getInvolved.links.partner}</a></li>
              <li><a href={localizePath(actionPaths.sponsorOrphan, activeLanguage)} className="hover:text-[#e1a226] transition-colors" onClick={handleNavClick('sponsor-orphan')}>{footerContent.sections.getInvolved.links.sponsorOrphan}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">{footerContent.sections.connect.title}</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li className="flex items-center gap-2 hidden">
                <Phone className="w-4 h-4" />
                <a href={footerContent.sections.connect.phone.href} className="hover:text-foreground transition-colors">{footerContent.sections.connect.phone.label}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={footerContent.sections.connect.email.href} className="hover:text-foreground transition-colors">{footerContent.sections.connect.email.label}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{footerContent.sections.connect.location}</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="text-sm mb-3">{footerContent.sections.connect.followUsTitle}</h5>
              <SocialLinks size="sm" shape="circle" />
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/40">
          <p>{footerContent.bottom.copyright}</p>
          <div className="flex gap-6">
            <a href={getPathForPage('privacy', activeLanguage)} className="hover:text-foreground transition-colors" onClick={handleNavClick('privacy')}>{footerContent.bottom.privacy}</a>
            <a href={getPathForPage('terms', activeLanguage)} className="hover:text-foreground transition-colors" onClick={handleNavClick('terms')}>{footerContent.bottom.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
