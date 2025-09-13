import process from 'node:process'
import { definePerson } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-18',
  site: {
    url: 'https://josephanson.com',
    name: 'Joseph Anson\'s Portfolio',
    description: 'Experienced Senior Web Developer with 8+ years of expertise in building scalable web applications using Vue.js, React, and TypeScript. Proficient in containerized deployments and modern web technologies. Passionate about open-source and cloud-native development.',
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
      description: 'Experienced Senior Web Developer with 8+ years of expertise in building scalable web applications using Vue.js, React, and TypeScript. Proficient in containerized deployments and modern web technologies. Passionate about open-source and cloud-native development.',
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
  ],
  llms: {
    domain: 'https://josephanson.com',
    title: 'Joseph Anson\'s Portfolio',
    description: 'Experienced Senior Web Developer with 8+ years of expertise in building scalable web applications using Vue.js, React, and TypeScript. Proficient in containerized deployments and modern web technologies. Passionate about open-source and cloud-native development.',
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
  devtools: {
    enabled: true,
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
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
    '/': { prerender: true },
    '/articles': { prerender: true },
    '/articles/**': { prerender: true },
    '/projects': { prerender: true },
    '/talks': { prerender: true },
    '/talks/**': { prerender: true },
    '/blogs/': { redirect: { to: '/articles/', statusCode: 301 } },
    '/blog/**': { redirect: { to: '/articles/**', statusCode: 301 } },
  },
})
