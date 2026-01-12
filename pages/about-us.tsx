import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ENV_CONFIG } from '../lib/env-config';

const AboutUs: React.FC = () => {
  const brandName = ENV_CONFIG.BRAND_NAME;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>About Us - Our Mission | {brandName}</title>
        <meta name="description" content={`Learn about ${brandName}'s mission to revolutionize AI trading for individual traders`} />
      </Head>

      <Header />

      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Easily Build Your AI Trade System
            </h1>
            <p className="text-xl text-slate-600 mb-16">
              We're on a mission to revolutionize how individual traders compete in the financial markets
            </p>

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Mission</h2>

              <div className="space-y-6 text-lg text-slate-600 text-left leading-relaxed">
                <p>
                  The world may be fair, but trading is not fair to beginners. Most people struggle to overcome human weaknesses, unable to escape the cycle of greed and fear.
                </p>

                <p>
                  Large financial institutions achieve consistent profits through team collaboration and advanced AI trading tools that minimize human psychological weaknesses. But ordinary traders lack both teams and tools, leaving them manipulated by the big players and losing money long-term. Many are forced to exit the market entirely.
                </p>

                <p>
                  With AiTrados, you can master the methods used by institutional traders and implement quantitative trading strategies that level the playing field. Our mission is to help individual traders gain the edge previously reserved for financial elites.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-2xl font-bold mb-4 text-slate-900">What We Offer</h3>
                <ul className="space-y-3 text-left text-slate-600">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>AI-powered trading strategies that minimize emotional decision-making</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive financial data APIs for stocks, crypto, forex, futures, and options</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Developer-friendly tools to build and backtest quantitative trading systems</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Level the playing field between individual traders and institutional investors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;

