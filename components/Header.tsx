import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { NAV_ITEMS } from '../constants';
import DatasetMenu from './DatasetMenu';
import { useTranslation, SUPPORTED_LANGUAGES } from './LanguageContext';
import { getLoginUrl, getSignupUrl } from '../lib/env-config';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, withLangPrefix } = useTranslation();
  const langMenuRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="w-full px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Logo />
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div 
                key={item.key} 
                className="relative group"
                onMouseEnter={() => item.isDropdown && setActiveDropdown(item.key)}
                onMouseLeave={() => item.isDropdown && setActiveDropdown(null)}
              >
                <a 
                  href={withLangPrefix(item.href)}
                  {...(item.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  })}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 py-4 ${
                    activeDropdown === item.key ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {t(item.key)}
                  {item.isDropdown && (
                    <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.key ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>
                {item.isDropdown && (
                  <div
                    onMouseEnter={() => setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <DatasetMenu isOpen={activeDropdown === item.key} />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mainstream Language Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all text-sm font-semibold"
            >
              <span className="text-lg">{currentLang.nativeLabel.split(' ')[0]}</span>
              <span className="uppercase">{currentLang.code}</span>
              <svg className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      // LanguageContext.setLanguage will update the URL (preserving path)
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                      language === lang.code 
                        ? 'bg-indigo-50 text-indigo-600 font-bold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[13px]">{lang.nativeLabel}</span>
                      <span className="text-[10px] opacity-60 font-medium">{lang.label}</span>
                    </div>
                    {language === lang.code && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={getLoginUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            {t('nav.signIn')}
          </a>
          <a
            href={getSignupUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            {t('nav.getStarted')}
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.key}>
                {item.isDropdown ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.key ? null : item.key)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      {t(item.key)}
                      <svg
                        className={`w-4 h-4 transition-transform ${activeDropdown === item.key ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === item.key && (
                      <div className="mt-2 pl-4 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                          {t('datasetMenu.marketData')}
                        </div>
                        {['crypto', 'forex', 'stock', 'future', 'option'].map(cat => (
                          <a
                            key={cat}
                            href={withLangPrefix(`/api_explorer/${cat}`)}
                            className="block px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg"
                          >
                            {t(`apiList.categories.${cat}`)}
                          </a>
                        ))}
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 mt-3">
                          {t('datasetMenu.insights')}
                        </div>
                        {['economic_calendar', 'news', 'holiday'].map(cat => (
                          <a
                            key={cat}
                            href={withLangPrefix(`/api_explorer/${cat}`)}
                            className="block px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg"
                          >
                            {t(`apiList.categories.${cat}`)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={withLangPrefix(item.href)}
                    {...(item.external && {
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    })}
                    className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {t(item.key)}
                  </a>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <a
                href={getLoginUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg text-left"
              >
                {t('nav.signIn')}
              </a>
              <a
                href={getSignupUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all text-center"
              >
                {t('nav.getStarted')}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
