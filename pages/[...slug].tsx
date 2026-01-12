import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import Header from '../components/Header'
import Ticker from '../components/Ticker'
import Footer from '../components/Footer'
import { PageHead } from '../components/PageHead'
import { useTranslation, SUPPORTED_LANGUAGES } from '../components/LanguageContext'
import { Language } from '../types'
import ExplorerShell from '../components/apiExplorers/ExplorerShell'
import OhlcLatestExplorer from '../components/apiExplorers/explorer_instances/OhlcLatestExplorer.tsx'
import PrivacyPolicy from './privacy-policy'
import TermsOfService from './terms-of-service'
import CookiePolicy from './cookie-policy'
import AboutUs from './about-us'
import { getAllStaticPaths } from '../lib/ssg_paths_config'
import Link from "next/dist/client/link";
import {ENV_CONFIG, getSignupUrl} from "@/lib/env-config.ts";

// Type guard to check if a string is a valid Language
const isLanguage = (code: string): code is Language => {
  return SUPPORTED_LANGUAGES.some(l => l.code === code)
}

// 环境变量控制渲染模式：SSR 或 SSG
// ⚠️ Next.js 不允许同时导出 getStaticProps 和 getServerSideProps
//
// 如何切换模式：
// 1. SSG（当前）：使用下面的 getStaticPaths + getStaticProps
// 2. SSR：注释掉下面的代码，取消注释文件末尾的 getServerSideProps
//
//const USE_SSR = process.env.USE_SSR === 'true'

// ====== SSG 模式（默认）======

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllStaticPaths(),
    fallback: false, // 静态导出模式必须为 false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      slug: context.params?.slug || [],
    },
  }
}
/**
// ====== SSR 模式（如需使用请取消注释，并注释掉上面的 SSG 代码）======
 export const getServerSideProps: GetServerSideProps = async (context) => {
   return {
     props: {
       slug: context.params?.slug || [],
     },
   }
 }
*/
export default function CatchAll({ slug: serverSlug }: { slug: string[] }) {
  // ... 页面组件代码保持不变
  const router = useRouter()
  const { slug: clientSlug = [] } = router.query

  const slug = router.isReady ? clientSlug : serverSlug
  const slugArray = Array.isArray(slug) ? slug : [slug]
  const { t, withLangPrefix } = useTranslation();

  const firstSegment = slugArray[0]?.toLowerCase()
  const isLangPrefix = firstSegment && isLanguage(firstSegment)

  const afterLang = isLangPrefix ? slugArray.slice(1) : slugArray

  if (afterLang.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <PageHead />
        <Ticker />
        <Header />

        <main className="flex-grow">
          <div className="pt-20 pb-12 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                {t('hero.tag')}
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.05]">
                {t('hero.title1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  {t('hero.title2')}
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed mb-12">
                {t('hero.subtitle')}
              </p>

<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
  <Link
    href={getSignupUrl()}
    className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
  >
    {t('hero.ctaPrimary')}
  </Link>
  <Link
    href={ENV_CONFIG.DOCS_URL}
    className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl border-2 border-slate-100 hover:border-slate-200 transition-all active:scale-95"
  >
    {t('hero.ctaSecondary')}
  </Link>
</div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-100 pt-16">
                {[
                  { label: t('stats.latency'), value: '< 15ms' },
                  { label: t('stats.uptime'), value: '99.99%' },
                  { label: t('stats.datasets'), value: '1,200+' },
                  { label: t('stats.calls'), value: '2.5B+' },
                ].map(stat => (
                  <div key={stat.label} className="text-center group">
                    <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <a href={withLangPrefix('/api_explorer/quickstart')} className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors text-lg">
              {t('hero.moreExplorers')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <OhlcLatestExplorer assetSchema="stock" />
        </main>

        <Footer />
      </div>
    )
  }

  const isApiExplorerBase = afterLang[0] === 'api_explorer'

  // 所有 api_explorer 路径都使用 ExplorerShell，包括 quickstart
  if (isApiExplorerBase) {
    return (
      <div className="min-h-screen flex flex-col">
        <Ticker />
        <Header />
        <main className="flex-grow">
          <ExplorerShell />
        </main>
        <Footer />
      </div>
    )
  }

  // 处理政策页面路由
  if (afterLang.length === 1) {
    const pageName = afterLang[0]

    // About Us 页面
    if (pageName === 'about-us') {
      return <AboutUs />
    }

    // Privacy Policy 页面
    if (pageName === 'privacy-policy') {
      return <PrivacyPolicy />
    }

    // Terms of Service 页面
    if (pageName === 'terms-of-service') {
      return <TermsOfService />
    }

    // Cookie Policy 页面
    if (pageName === 'cookie-policy') {
      return <CookiePolicy />
    }
  }

  return (
    <div className="min-h-screen">
      <main>
        <div className="pt-20 pb-12 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold">Page Not Found</h1>
          </div>
        </div>
      </main>
    </div>
  )
}
