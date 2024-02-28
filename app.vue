<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/animations.css'

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
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: () => `transition will-change-background ${classes.value.gradient} ${classes.value.text}`,
  },
})

useSeoMeta({
  ogTitle: 'Vue.js Expert & Web Developer - Joseph Anson',
  ogDescription: 'Explore the portfolio of Joseph Anson, a Vue.js expert, and discover cutting-edge web applications that blend functionality with sleek design.',
  ogUrl: 'https://www.josephanson.com',
  twitterTitle: 'Vue.js Expert & Web Developer - Joseph Anson',
  twitterDescription: 'Discover the work of Joseph Anson, a Vue.js expert with a passion for creating accessible and engaging web applications.',
  twitterCard: 'summary',
})

defineOgImage({
  component: 'Default',
  renderer: 'santori',
})
</script>

<template>
  <div class="of-y-auto scroll-smooth">
    <TheHeader />

    <main>
      <BaseContainer class="relative z-8 text-sm md:text-base">
        <NuxtPage />
      </BaseContainer>
    </main>

    <TheFooter />
  </div>
</template>
