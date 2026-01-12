import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ENV_CONFIG } from '../lib/env-config';

const TermsOfService: React.FC = () => {
  const brandName = ENV_CONFIG.BRAND_NAME;
  const orgName = ENV_CONFIG.ORGANIZATION_NAME;
  const websiteUrl = ENV_CONFIG.WEBSITE_URL;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Terms of Service - {brandName}</title>
        <meta name="description" content={`Terms of Service for ${brandName}`} />
      </Head>

      <Header />

      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-600 mb-8">Last Updated: December 28, 2025</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using {brandName} ({websiteUrl}), you accept and agree to be bound by
                the terms and provision of this agreement. These Terms of Service ("Terms") constitute
                a legally binding agreement between you and {orgName} ("Company," "we," "us," or "our").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Permission is granted to temporarily access and use the service for personal or commercial
                purposes. This is the grant of a license, not a transfer of title, and under this license
                you may not:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose without authorization</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or mirror on any other server</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. API Usage and Rate Limits</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                When using our API services:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>You must comply with our API rate limits and usage guidelines</li>
                <li>You are responsible for maintaining the security of your API keys</li>
                <li>You may not share your API credentials with third parties</li>
                <li>We reserve the right to throttle or block excessive usage</li>
                <li>Free tier limitations apply as specified in your account dashboard</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. User Accounts</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current
                information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Maintaining the confidentiality of your account and password</li>
                <li>Restricting access to your account</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Acceptable Use Policy</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You agree not to use the service:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>In any way that violates applicable laws or regulations</li>
                <li>To transmit or procure sending of spam or unsolicited communications</li>
                <li>To impersonate or attempt to impersonate the Company or others</li>
                <li>To engage in any automated data collection without permission</li>
                <li>To interfere with or disrupt the service or servers</li>
                <li>To attempt to gain unauthorized access to any systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed">
                The service and its original content, features, and functionality are and will remain
                the exclusive property of {orgName} and its licensors. The service is protected by
                copyright, trademark, and other laws. Our trademarks may not be used in connection
                with any product or service without prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Payment and Billing</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                For paid services:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>All fees are exclusive of applicable taxes</li>
                <li>Payment is due according to your selected billing cycle</li>
                <li>We reserve the right to change pricing with notice</li>
                <li>Refunds are handled on a case-by-case basis</li>
                <li>Failure to pay may result in service suspension</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Service Availability</h2>
              <p className="text-slate-600 leading-relaxed">
                We strive to maintain high availability but do not guarantee that the service will be
                uninterrupted, timely, secure, or error-free. We reserve the right to modify, suspend,
                or discontinue the service at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-slate-600 leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                IN NO EVENT SHALL {orgName.toUpperCase()}, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
                FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Indemnification</h2>
              <p className="text-slate-600 leading-relaxed">
                You agree to defend, indemnify, and hold harmless {orgName} from and against any claims,
                damages, obligations, losses, liabilities, costs, or debt arising from your use of the
                service or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Termination</h2>
              <p className="text-slate-600 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability,
                for any reason, including if you breach these Terms. Upon termination, your right to
                use the service will immediately cease.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Governing Law</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of the United States,
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. We will provide notice
                of material changes by posting the new Terms on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Contact Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <p className="text-slate-700"><strong>{orgName}</strong></p>
                <p className="text-slate-600">Email: legal@aitrados.com</p>
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

export default TermsOfService;

