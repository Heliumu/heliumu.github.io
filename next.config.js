/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
  turbopack: {},
  // Disable webpack persistent cache in development to avoid "Unable to snapshot resolve dependencies" warnings
  webpack: (config, { dev }) => {
    if (dev) {
      // Turn off caching (webpack persistent cache) in dev to avoid snapshot resolution issues
      try {
        config.cache = false;
      } catch (e) {
        // ignore
      }
    }
    return config;
  }
}

export default nextConfig
