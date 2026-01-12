import React, { useState, useEffect } from 'react';
import { useTranslation } from './LanguageContext';

/**
 * Cookie 同意横幅组件
 * 符合 GDPR 和其他隐私法规要求
 */
export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { withLangPrefix } = useTranslation();

  useEffect(() => {
    // 检查用户是否已经同意
    const hasConsented = localStorage.getItem('cookie_consent');
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
    // 清除所有非必要的 cookies
    // 这里可以添加清除逻辑
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-indigo-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              🍪 We Value Your Privacy
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We use cookies and similar technologies to enhance your browsing experience,
              analyze site traffic, and personalize content. By clicking "Accept All",
              you consent to our use of cookies.{' '}
              <a
                href={withLangPrefix('/cookie-policy')}
                className="text-indigo-600 hover:underline font-medium"
              >
                Learn more
              </a>
            </p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs">
              <a
                href={withLangPrefix('/privacy-policy')}
                className="text-indigo-600 hover:underline"
              >
                Privacy Policy
              </a>
              <span className="text-slate-300">|</span>
              <a
                href={withLangPrefix('/terms-of-service')}
                className="text-indigo-600 hover:underline"
              >
                Terms of Service
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleDecline}
              className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

