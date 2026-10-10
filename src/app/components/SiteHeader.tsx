import { ChevronDown, Languages, Menu, Snowflake, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import logoImage from '../../assets/logo and qr code.svg';
import { content } from '../../content';
import { getPathForPage, type LanguageCode, type PageKey, isPlainLeftClick } from '../routes';
import { PrimaryButton } from './PrimaryButton';

type SiteHeaderProps = {
  onNavigate?: (page: PageKey) => void;
  activePage?: PageKey;
  language?: string;
  onLanguageChange?: (language: string) => void;
};

export function SiteHeader({ onNavigate, activePage, language, onLanguageChange }: SiteHeaderProps) {
  const languages = content.header.languages;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language ?? languages[0]?.code ?? 'EN');
  const activeLanguage = (language ?? languages[0]?.code ?? 'EN') as LanguageCode;
  const promoBar = content.shared.promoBar;
  const navItems: Array<{ key: PageKey; label: string; href: string }> = content.header.navItems.map((item) => ({
    key: item.key,
    label: item.label,
    href: getPathForPage(item.key, activeLanguage)
  }));
  const topLinks: Array<{ key: PageKey; label: string; href: string }> = content.header.topLinks.map((item) => ({
    key: item.key,
    label: item.label,
    href: getPathForPage(item.key, activeLanguage)
  }));
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Read the ref at click time: the dropdown is re-created when the top bar re-appears.
      const currentRef = languageDropdownRef.current;
      if (currentRef && !currentRef.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (language) {
      setSelectedLanguage(language);
    }
  }, [language]);

  // While the mobile menu is open: stop the page behind it from scrolling, and let Escape close it.
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [mobileMenuOpen]);

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

  const handleMenuNavClick = (page: PageKey) => (event: { preventDefault: () => void }) => {
    if (!isPlainLeftClick(event)) {
      return;
    }
    if (onNavigate) {
      event.preventDefault();
      setMobileMenuOpen(false);
      onNavigate(page);
      return;
    }
    setMobileMenuOpen(false);
  };

  const handleDonateClick = () => {
    if (onNavigate) {
      onNavigate('donate');
      return;
    }
    if (typeof window !== 'undefined') {
      window.location.href = getPathForPage('donate', activeLanguage);
    }
  };

  const handleMenuDonateClick = () => {
    setMobileMenuOpen(false);
    handleDonateClick();
  };

  const promoParams = new URLSearchParams({
    cause: 'winter-campaign',
    campaign: 'winter-2026'
  });
  const promoDonateHref = `${getPathForPage('donate', activeLanguage)}?${promoParams.toString()}`;
  const handlePromoDonateClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      window.location.href = promoDonateHref;
    }
  };

  const getNavClassName = (page: PageKey) =>
    activePage === page
      ? 'text-[#e1a226] font-semibold'
      : 'font-semibold hover:opacity-60 transition-opacity';

  return (
    <header className="bg-white border-b border-black/5 sticky top-0 z-50">
      <div className="bg-[#e1a226] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className={`text-sm sm:text-base font-medium flex items-center gap-2 ${
              activeLanguage === 'AR' ? 'text-right w-full' : 'text-left'
            }`}
            dir={activeLanguage === 'AR' ? 'rtl' : 'ltr'}
          >
            <Snowflake className="w-4 h-4" />
            <span>{promoBar.message}</span>
          </p>
          <a
            href={promoDonateHref}
            onClick={handlePromoDonateClick}
            className="inline-flex items-center justify-center rounded-full bg-white text-[#e1a226] px-4 py-2 text-sm font-semibold whitespace-nowrap hover:bg-white/90 transition-colors"
          >
            {promoBar.ctaLabel}
          </a>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {!isScrolled && (
          <motion.div
            key="topbar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 48, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="bg-white border-b border-black/5"
            style={{ overflow: 'visible' }}
          >
            <div className="max-w-[1400px] mx-auto px-8 py-3 flex items-center justify-end gap-6 text-sm">
              <div className="hidden md:flex items-center gap-6">
                {topLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-[#e1a226] font-medium hover:opacity-60 transition-opacity"
                    onClick={handleNavClick(item.key)}
                    aria-current={activePage === item.key ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="relative" ref={languageDropdownRef}>
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setLanguageDropdownOpen(false);
                    }
                  }}
                  aria-haspopup="true"
                  aria-expanded={languageDropdownOpen}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#e1a226]/10 transition-all"
                >
                  <Languages className="w-4 h-4" />
                  <span className="font-medium">{selectedLanguage}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {languageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute end-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-black/5 py-1.5 min-w-[140px] z-[100]"
                    >
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => {
                            setSelectedLanguage(language.code);
                            setLanguageDropdownOpen(false);
                            onLanguageChange?.(language.code);
                          }}
                          className={`w-full px-4 py-2.5 text-start hover:bg-[#e1a226]/10 transition-colors ${
                            selectedLanguage === language.code ? 'bg-[#e1a226]/5 text-[#e1a226]' : ''
                          }`}
                        >
                          <span className="block font-medium">{language.label}</span>
                          <span className="block text-xs text-foreground/50 mt-0.5">{language.code}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
        <a
          href={getPathForPage('home', activeLanguage)}
          className="flex items-center cursor-pointer"
          onClick={handleNavClick('home')}
          aria-label={content.header.homeLinkAria}
        >
          <img src={logoImage} alt={content.header.logoAlt} className="h-12 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={getNavClassName(item.key)}
              onClick={handleNavClick(item.key)}
              aria-current={activePage === item.key ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
          <PrimaryButton type="button" size="sm" onClick={handleDonateClick}>
            {content.header.donateButton}
          </PrimaryButton>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? content.header.menuAria.close : content.header.menuAria.open}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: activeLanguage === 'AR' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: activeLanguage === 'AR' ? '-100%' : '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="px-8 py-6 border-b border-black/5 flex items-center justify-between"
              >
                <a
                  href={getPathForPage('home', activeLanguage)}
                  className="flex items-center cursor-pointer"
                  onClick={handleMenuNavClick('home')}
                  aria-label={content.header.homeLinkAria}
                >
                  <img src={logoImage} alt={content.header.logoAlt} className="h-10 w-auto" />
                </a>
                <button onClick={() => setMobileMenuOpen(false)} aria-label={content.header.menuAria.close}>
                  <X className="w-7 h-7" />
                </button>
              </motion.div>

              <nav className="flex-1 flex flex-col justify-start px-8 pt-10 pb-10 gap-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    className="text-4xl font-semibold tracking-tight hover:text-[#e1a226] transition-colors"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    onClick={handleMenuNavClick(item.key)}
                  >
                    {item.label}
                  </motion.a>
                ))}

                <motion.div
                  className="mt-8 self-start"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <PrimaryButton size="xl" className="text-lg" onClick={handleMenuDonateClick}>
                    {content.header.donateButton}
                  </PrimaryButton>
                </motion.div>

                <div className="flex flex-col gap-3">
                  {topLinks.map((item, index) => (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      className="text-lg text-[#e1a226] hover:text-[#c78f1f] transition-colors"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: 0.45 + index * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      onClick={handleMenuNavClick(item.key)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="px-8 py-6 border-t border-black/5"
              >
                <div className="flex flex-col gap-3">
                  <a
                    href={getPathForPage('privacy', activeLanguage)}
                    className="text-xs text-foreground/50 hover:text-foreground/70 transition-colors"
                    onClick={handleMenuNavClick('privacy')}
                  >
                    {content.header.mobileFooterLinks.privacy}
                  </a>
                  <a
                    href={getPathForPage('terms', activeLanguage)}
                    className="text-xs text-foreground/50 hover:text-foreground/70 transition-colors"
                    onClick={handleMenuNavClick('terms')}
                  >
                    {content.header.mobileFooterLinks.terms}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
