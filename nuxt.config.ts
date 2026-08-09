import process from 'node:process'
import { definePerson } from 'nuxt-schema-org/schema'

const pageRevalidationHeaders = {
  'cache-control': 'public, max-age=0, must-revalidate',
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-18',
  site: {
    url: 'https://josephanson.com',
    name: 'Joseph Anson\'s Portfolio',
    description: 'Frontend engineer and Nord Design System core team member working across design systems, accessibility, developer experience, and TypeScript architecture.',
    defaultLocale: 'en',
  },
  umami: {
    host: 'https://unami.josephanson.com/',
    id: '12879b25-2e43-4ce5-8c63-b14c309854a8',
  },
  plugins: [
    '~/plugins/router.client.ts',
  ],
  seo: {
    meta: {
      author: 'Joseph Anson',
    },
    automaticDefaults: true,
  },
  schemaOrg: {
    identity: definePerson({
      name: 'Joseph Anson',
      image: '/me.jpg',
      description: 'Frontend engineer and Nord Design System core team member working across design systems, accessibility, developer experience, and TypeScript architecture.',
      url: 'https://josephanson.com',
      sameAs: [
        'https://linkedin.com/in/josephanson/',
        'https://github.com/josephanson',
      ],
    }),
  },
  modules: [
    'nuxt-content-twoslash',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/seo',
    'nuxt-umami',
    '@nuxt/content',
    'nuxt-llms',
    'motion-v/nuxt',
  ],
  llms: {
    domain: 'https://josephanson.com',
    title: 'Joseph Anson\'s Portfolio',
    description: 'Frontend engineer and Nord Design System core team member working across design systems, accessibility, developer experience, and TypeScript architecture.',
  },
  linkChecker: {
    skipInspections: ['absolute-site-urls'],
  },
  sitemap: {
    cacheMaxAgeSeconds: 3600,
    autoLastmod: true,
  },
  ogImage: {
    defaults: {
      renderer: 'satori',
    },
  },
  vue: {
    compilerOptions: {
      comments: true,
    },
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
  },
  experimental: {
    emitRouteChunkError: 'automatic-immediate',
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  image: {
    domains: [`${process.env.MINIO_URL}:9000`],
  },
  nitro: {
    compressPublicAssets: true,
    experimental: {
      tasks: true,
    },
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml'],
    },
  },
  routeRules: {
    '/': { prerender: true, headers: pageRevalidationHeaders },
    '/_payload.json': { headers: pageRevalidationHeaders },
    '/**/_payload.json': { headers: pageRevalidationHeaders },
    '/open-for-work': { redirect: { to: '/', statusCode: 302 } },
    '/articles': { prerender: true, headers: pageRevalidationHeaders },
    '/articles/**': { prerender: true, headers: pageRevalidationHeaders },
    '/projects': { prerender: true, headers: pageRevalidationHeaders },
    '/talks': { prerender: true, headers: pageRevalidationHeaders },
    '/talks/**': { prerender: true, headers: pageRevalidationHeaders },
    '/blogs/': { redirect: { to: '/articles/', statusCode: 301 } },
    '/blog/**': { redirect: { to: '/articles/**', statusCode: 301 } },
  },
})
