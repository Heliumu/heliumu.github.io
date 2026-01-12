import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
//import { GetServerSideProps } from 'next'
import { PageHead } from '../components/PageHead'
/**
// Root index redirects to language-prefixed home
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Determine language from Accept-Language header or use default
  const acceptLang = context.req.headers['accept-language'] || ''
  let lang = 'en' // default

  if (acceptLang.includes('zh-cn') || acceptLang.includes('zh-CN') || acceptLang.includes('hans')) {
    lang = 'zh_cn'
  } else if (acceptLang.includes('zh-tw') || acceptLang.includes('zh-TW') || acceptLang.includes('zh-hk') || acceptLang.includes('hant')) {
    lang = 'zh'
  } else if (acceptLang.startsWith('ja')) {
    lang = 'ja'
  } else if (acceptLang.startsWith('ko')) {
    lang = 'ko'
  } else if (acceptLang.startsWith('de')) {
    lang = 'de'
  } else if (acceptLang.startsWith('fr')) {
    lang = 'fr'
  }

  return {
    redirect: {
      destination: `/${lang}`,
      permanent: false,
    },
  }
}
**/

export default function Home() {
  // This component should never render due to server redirect
  // But add client-side fallback just in case
  const router = useRouter()

  useEffect(() => {
    // Client-side fallback redirect
    const navLang = navigator.language?.toLowerCase() || 'en'
    let lang = 'en'

    if (navLang.includes('zh-cn') || navLang.includes('hans')) {
      lang = 'zh_cn'
    } else if (navLang.includes('zh-tw') || navLang.includes('zh-hk') || navLang.includes('hant')) {
      lang = 'zh'
    } else if (navLang.startsWith('ja')) {
      lang = 'ja'
    } else if (navLang.startsWith('ko')) {
      lang = 'ko'
    } else if (navLang.startsWith('de')) {
      lang = 'de'
    } else if (navLang.startsWith('fr')) {
      lang = 'fr'
    }

    router.replace(`/${lang}`)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <PageHead />
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting...</p>
      </div>
    </div>
  )
}

