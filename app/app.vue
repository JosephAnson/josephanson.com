<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import './styles/animations.css'
import './styles/base.css'
import './styles/prose.css'

const { classes } = useTheme()

useHead({
  titleTemplate(title) {
    return title ? `${title} - Joseph Anson` : 'Joseph Anson'
  },
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'view-transition',
      content: 'same-origin',
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Joseph Anson\'s personal website' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  ],
  link: [
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', type: 'image/png', href: '/apple-touch-icon.png' },
  ],
  htmlAttrs: {
    lang: 'en',
    class: () => `print:bg-none ${classes.value.htmlBackground}`,
  },
  bodyAttrs: {
    class: () => `print:bg-none ${classes.value.gradient} ${classes.value.text}`,
  },
})

useSeoMeta({
  ogTitle: 'Vue.js Expert & Web Developer - Joseph Anson',
  ogDescription: 'Explore the portfolio of Joseph Anson, a Vue.js expert, and discover cutting-edge web applications that blend functionality with sleek design.',
  ogUrl: 'https://www.josephanson.com',
  twitterTitle: 'Vue.js Expert & Web Developer - Joseph Anson',
  twitterDescription: 'Discover the work of Joseph Anson, a Vue.js expert with a passion for creating accessible and engaging web applications.',
  twitterCard: 'summary',
  ogType: 'website',
})

defineOgImageComponent('Default')

const el = useTemplateRef<HTMLElement>('page')
const router = useRouter()
const { y } = useScroll(el)

watch(() => router.currentRoute.value.fullPath, () => {
  y.value = 0
})
</script>

<template>
  <div ref="page" class="h-full of-y-scroll scroll-smooth print:h-auto">
    <TheHeader />
    <main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    <TheFooter />
  </div>
</template>
