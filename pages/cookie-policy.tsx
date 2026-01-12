import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ENV_CONFIG } from '../lib/env-config';

const CookiePolicy: React.FC = () => {
  const brandName = ENV_CONFIG.BRAND_NAME;
  const orgName = ENV_CONFIG.ORGANIZATION_NAME;
  const websiteUrl = ENV_CONFIG.WEBSITE_URL;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Cookie Policy - {brandName}</title>
        <meta name="description" content={`Cookie Policy for ${brandName}`} />
      </Head>

      <Header />

      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
          <p className="text-slate-600 mb-8">Last Updated: December 28, 2025</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. What Are Cookies</h2>
              <p className="text-slate-600 leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you
                visit a website. They are widely used to make websites work more efficiently and provide
                information to website owners. At {brandName}, we use cookies and similar technologies
                to enhance your experience on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use cookies for several purposes:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>To enable certain functions of the service</li>
                <li>To provide analytics and understand how our service is used</li>
                <li>To store your preferences and settings</li>
                <li>To deliver personalized content and advertisements</li>
                <li>To recognize you when you return to our website</li>
                <li>To improve the security of our service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Types of Cookies We Use</h2>

              <div className="space-y-6">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Essential Cookies</h3>
                  <p className="text-slate-600 leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable core
                    functionality such as security, network management, and accessibility. You cannot
                    opt-out of these cookies.
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Examples: Session cookies, authentication cookies, load balancing cookies
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Analytics Cookies</h3>
                  <p className="text-slate-600 leading-relaxed">
                    These cookies help us understand how visitors interact with our website by collecting
                    and reporting information anonymously. This helps us improve the way our website works.
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Examples: Google Analytics, visitor statistics, page view tracking
                  </p>
                </div>

                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Functional Cookies</h3>
                  <p className="text-slate-600 leading-relaxed">
                    These cookies enable enhanced functionality and personalization, such as remembering
                    your preferences (e.g., language choice) and providing customized features.
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Examples: Language preference, theme settings, user preferences
                  </p>
                </div>

                <div className="border-l-4 border-pink-600 pl-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Advertising Cookies</h3>
                  <p className="text-slate-600 leading-relaxed">
                    These cookies are used to deliver advertisements that are relevant to you and your
                    interests. They also help limit the number of times you see an advertisement and
                    measure the effectiveness of advertising campaigns.
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Examples: Ad targeting, conversion tracking, remarketing
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In addition to our own cookies, we may use various third-party services that set cookies
                to provide their services. These include:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and user behavior tracking</li>
                <li><strong>Content Delivery Networks (CDN):</strong> For faster content delivery</li>
                <li><strong>Authentication Services:</strong> For secure login functionality</li>
                <li><strong>Payment Processors:</strong> For secure payment processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookie Duration</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cookies can be temporary or persistent:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li><strong>Session Cookies:</strong> These are temporary and expire when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. How to Control Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can control cookies in several ways:
              </p>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">Browser Controls</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Block all cookies</li>
                <li>Accept all cookies</li>
                <li>Be notified when a cookie is set</li>
                <li>Delete existing cookies</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800 font-semibold mb-2">Browser Cookie Settings:</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                  <li><strong>Edge:</strong> Settings → Privacy & Security → Cookies</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">Our Cookie Consent Banner</h3>
              <p className="text-slate-600 leading-relaxed">
                When you first visit our website, we display a cookie consent banner allowing you to
                accept or decline non-essential cookies. You can change your preferences at any time
                by clearing your browser cookies and revisiting the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Do Not Track (DNT)</h2>
              <p className="text-slate-600 leading-relaxed">
                Some browsers include a "Do Not Track" (DNT) feature. While we respect your privacy
                preferences, our website does not currently respond to DNT signals due to lack of
                industry standards. We continue to monitor developments in DNT technology.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Local Storage and Similar Technologies</h2>
              <p className="text-slate-600 leading-relaxed">
                In addition to cookies, we may use local storage, session storage, and similar
                technologies to store information on your device. These technologies serve similar
                purposes to cookies but can store larger amounts of data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Impact of Blocking Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you choose to block or delete cookies, some features of our website may not function
                properly. This may include:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Inability to stay logged in</li>
                <li>Loss of saved preferences</li>
                <li>Reduced personalization</li>
                <li>Limited access to certain features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Updates to This Cookie Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices
                or for legal, operational, or regulatory reasons. Please revisit this page periodically
                to stay informed about our use of cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. More Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                For more information about our privacy practices, please see our{' '}
                <a href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <p className="text-slate-700"><strong>{orgName}</strong></p>
                <p className="text-slate-600">Email: privacy@aitrados.com</p>
                <p className="text-slate-600">Website: {websiteUrl}</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;

