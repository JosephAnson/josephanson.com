import process from 'node:process'
import { definePerson } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  compatibilityDate: '2024-09-11',
  future: {
    compatibilityVersion: 4,
  },
  site: {
    name: 'Joseph Anson\'s Portfolio',
    url: 'https://josephanson.com',
  },
  umami: {
    host: 'https://unami.josephanson.com/',
    id: '12879b25-2e43-4ce5-8c63-b14c309854a8',
  },
  plugins: [
    '~/plugins/router.client.ts',
  ],
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
  pages: true,
  modules: [
    'nuxt-content-twoslash',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'nuxt-schema-org',
    'nuxt-umami',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nuxt-og-image',
  ],
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
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },
  nitro: {
    compressPublicAssets: true,
    experimental: {
      tasks: true,
    },
    prerender: {
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
