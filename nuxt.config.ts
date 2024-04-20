import process from 'node:process'

export default defineNuxtConfig({
  site: {
    url: 'https://josephanson.com', // production URL
  },
  extends: ['nuxt-umami'],
  appConfig: {
    umami: {
      host: 'https://unami.josephanson.com/',
      id: '12879b25-2e43-4ce5-8c63-b14c309854a8',
      version: 2,
    },
  },
  plugins: [
    '~/plugins/router.client.ts',
  ],
  pages: true,
  modules: [
    '@nuxthq/studio',
    'nuxt-content-twoslash', // this needs to be before `@nuxt/content`
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
    'nuxt-schema-org',
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
  },
})
