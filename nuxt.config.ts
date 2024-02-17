export default defineNuxtConfig({
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
  ],
  devtools: {
    enabled: true,
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
  },
  content: {
    documentDriven: true,
    navigation: {
      fields: ['navTitle'],
    },
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini', 'c', 'cpp'],
    },
  },
  image: {
    domains: [`${process.env.MINIO_URL}:9000`],
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [],
    },
    storage: {
      cache: {
        driver: 'redis',
        host: `${process.env.REDIS_HOST}`,
        port: 6379,
        username: 'default',
        password: `${process.env.REDIS_PASSWORD}`,
        db: 10,
      },
      data: {
        driver: 'redis',
        host: `${process.env.REDIS_HOST}`,
        port: 6379,
        username: 'default',
        password: `${process.env.REDIS_PASSWORD}`,
        db: 10,
      },
    },
    // Development
    devStorage: {
      cache: {
        driver: 'redis',
        host: `${process.env.REDIS_HOST}`,
        port: 6379,
        username: 'default',
        password: `${process.env.REDIS_PASSWORD}`,
        db: 10,
      },
      data: {
        driver: 'redis',
        host: `${process.env.REDIS_HOST}`,
        port: 6379,
        username: 'default',
        password: `${process.env.REDIS_PASSWORD}`,
        db: 10,
      },
    },
  },
})
