import type { AppProps } from 'next/app'
import React from 'react'
import { useRouter } from 'next/router'
import { LanguageProvider, getLanguageFromPath } from '../components/LanguageContext'
import { CookieConsent } from '../components/CookieConsent'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const initialLanguage = getLanguageFromPath(router.asPath)

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <Component {...pageProps} />
      <CookieConsent />
    </LanguageProvider>
  )
}
