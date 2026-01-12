import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ENV_CONFIG } from '../lib/env-config';

const PrivacyPolicy: React.FC = () => {
  const brandName = ENV_CONFIG.BRAND_NAME;
  const orgName = ENV_CONFIG.ORGANIZATION_NAME;
  const websiteUrl = ENV_CONFIG.WEBSITE_URL;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Privacy Policy - {brandName}</title>
        <meta name="description" content={`Privacy Policy for ${brandName}`} />
      </Head>

      <Header />

      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-600 mb-8">Last Updated: December 28, 2025</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Welcome to {brandName}. {orgName} ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website {websiteUrl} and use our services.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Please read this privacy policy carefully. If you do not agree with the terms of this
                privacy policy, please do not access the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">2.1 Personal Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Register for an account</li>
                <li>Subscribe to our newsletter</li>
                <li>Use our API services</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you access our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring/exit pages</li>
                <li>Clickstream data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Provide, operate, and maintain our services</li>
                <li>Improve and personalize user experience</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative information and updates</li>
                <li>Respond to customer service requests</li>
                <li>Monitor and analyze usage and trends</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>With Your Consent:</strong> With your explicit permission for specific purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our service and hold
                certain information. You can instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For more information about cookies, please see our{' '}
                <a href="/cookie-policy" className="text-indigo-600 hover:underline">Cookie Policy</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your
                personal information. However, no method of transmission over the Internet or electronic
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Data Protection Rights (GDPR)</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Children's Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect
                personal information from children under 13. If you become aware that a child has provided
                us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. International Data Transfers</h2>
              <p className="text-slate-600 leading-relaxed">
                Your information may be transferred to and maintained on computers located outside of your
                state, province, country, or other governmental jurisdiction where data protection laws may
                differ. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;

