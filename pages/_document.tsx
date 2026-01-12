import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
  render() {
    // 从环境变量读取 favicon 路径
    const faviconPath = process.env.NEXT_PUBLIC_LOGO_ICON || '/images/favicon.ico';

    return (
      <Html lang="en">
        <Head>
          {/* Favicon */}
          <link rel="icon" href={faviconPath} />
          <link rel="shortcut icon" href={faviconPath} />

          {/* Google Analytics (GA4) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-89WYNQ4TSR"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-89WYNQ4TSR');
              `,
            }}
          />

          {/* Tailwind CDN for quick migration (matches original index.html) */}
          <script src="https://cdn.tailwindcss.com"></script>
          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
          {/* Small inline styles from original index.html */}
          <style>{`body { font-family: 'Inter', sans-serif; } .font-mono { font-family: 'Fira Code', monospace; } ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; } ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }`}</style>
        </Head>
        <body className="bg-slate-50 text-slate-900 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

