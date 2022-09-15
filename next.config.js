/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    sanityApiProjectId: process.env.SANITY_API_PROJECT_ID,
    sanityApiDataset: process.env.SANITY_API_DATASET,
  },
  publicRuntimeConfig: {
    sanityApiProjectId: process.env.SANITY_API_PROJECT_ID,
    sanityApiDataset: process.env.SANITY_API_DATASET,
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['hr', 'en'],
    defaultLocale: 'hr',
    localeDetection: false,
  }
}

module.exports = nextConfig
