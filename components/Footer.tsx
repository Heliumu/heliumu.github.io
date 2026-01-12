import React from 'react';
import Logo from './Logo';
import { useTranslation } from './LanguageContext';

const Footer: React.FC = () => {
  const { t, withLangPrefix } = useTranslation();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-6" />
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                  <span className="sr-only">{social}</span>
                  <div className="w-3 h-3 bg-current rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t('footer.product')}</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><a href="#" className="hover:text-indigo-600">API Reference</a></li>
              <li><a href="#" className="hover:text-indigo-600">WS push Reference</a></li>
              <li><a href="#" className="hover:text-indigo-600">System Status</a></li>

            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t('footer.datasets')}</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><a href={withLangPrefix(`/api_explorer/quickstart`)} className="hover:text-indigo-600">Equities</a></li>
              <li><a href={withLangPrefix(`/api_explorer/quickstart`)} className="hover:text-indigo-600">Futures</a></li>
              <li><a href={withLangPrefix(`/api_explorer/quickstart`)} className="hover:text-indigo-600">Crypto</a></li>
              <li><a href={withLangPrefix(`/api_explorer/quickstart`)} className="hover:text-indigo-600">Forex</a></li>
              <li><a href={withLangPrefix(`/api_explorer/quickstart`)} className="hover:text-indigo-600">Options</a></li>
              <li><a href={withLangPrefix(`/api_explorer/quickstart`)} className="hover:text-indigo-600">Economic Data</a></li>
              <li><a href={withLangPrefix(`/api_explorer/quickstart`)} className="hover:text-indigo-600">Financial News</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t('footer.company')}</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><a href={withLangPrefix('/about-us')} className="hover:text-indigo-600">{t('footer.aboutUs')}</a></li>
              <li><a href={withLangPrefix('/terms-of-service')} className="hover:text-indigo-600">{t('footer.termsOfService')}</a></li>
              <li><a href={withLangPrefix('/privacy-policy')} className="hover:text-indigo-600">{t('footer.privacyPolicy')}</a></li>
              <li><a href="#" className="hover:text-indigo-600">{t('footer.contactSupport')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">{t('footer.rights')}</p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href={withLangPrefix('/terms-of-service')} className="hover:text-indigo-600">Terms</a>
            <a href={withLangPrefix('/privacy-policy')} className="hover:text-indigo-600">Privacy</a>
            <a href={withLangPrefix('/cookie-policy')} className="hover:text-indigo-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
