import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2024-09-11',
  site: {
    url: 'https://josephanson.com', // production URL
  },
  umami: {
    host: 'https://unami.josephanson.com/',
    id: '12879b25-2e43-4ce5-8c63-b14c309854a8',
  },
  plugins: [
    '~/plugins/router.client.ts',
  ],
  pages: true,
  modules: [
    '@nuxthq/studio', // this needs to be before `@nuxt/content`
    'nuxt-content-twoslash',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
    'nuxt-schema-org',
    'nuxt-umami',
  ],
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
  content: {
    documentDriven: true,
    navigation: {
      fields: ['navTitle'],
    },
    highlight: {
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini', 'c', 'cpp'],
    },
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
      routes: ['/sitemap.xml'],
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/projects': { prerender: true },
  },
})
