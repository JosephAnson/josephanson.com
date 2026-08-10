<script setup lang="ts">
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/commissioner/wght.css'
import '@unocss/reset/tailwind.css'
import './styles/animations.css'
import './styles/base.css'
import './styles/prose.css'

const { classes, currentTheme } = useTheme()
const colorMode = useColorMode()
const hasHydrated = useMounted()

const route = useRoute()

watch(() => route.fullPath, async () => {
  if (!import.meta.client)
    return

  await nextTick()
  if (route.hash) {
    document.querySelector<HTMLElement>(route.hash)?.scrollIntoView()
    return
  }

  window.scrollTo({
    top: 0,
    behavior: 'auto',
  })
}, { flush: 'post' })

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
    { name: 'description', content: 'The personal website of Joseph Anson: frontend projects, design-system work, technical notes, talks, and occasional web experiments.' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  ],
  link: [
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#3f61a6' },
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', type: 'image/png', href: '/apple-touch-icon.png' },
  ],
  htmlAttrs: {
    'lang': 'en',
    'class': () => `print:bg-none ${classes.value.htmlBackground}`,
    'data-accent': () => currentTheme.value,
  },
  bodyAttrs: {
    class: () => `print:bg-none ${classes.value.gradient} ${classes.value.text}`,
  },
})

useSeoMeta({
  ogTitle: 'Frontend projects, experiments & notes - Joseph Anson',
  ogDescription: 'Projects, design-system work, technical notes, talks, and occasional web experiments by Joseph Anson.',
  ogUrl: 'https://www.josephanson.com',
  ogType: 'website',
})

defineOgImage('Default', {
  title: 'Systems, products, experiments.',
  description: 'Frontend projects, design-system work, technical notes, talks, and occasional web experiments.',
})

const pageTransition = {
  name: 'route',
  mode: 'out-in' as const,
}

const ditherColor = computed<[number, number, number]>(() => {
  // The canvas is deliberately faint, so these keep each route accent's hue
  // while restoring the chroma lost when the layer blends into the paper.
  const lightColors: Record<string, [number, number, number]> = {
    blue: [0.08, 0.27, 0.9],
    violet: [0.55, 0.2, 0.62],
    emerald: [0.08, 0.54, 0.3],
    rust: [0.9, 0.2, 0.06],
  }

  const darkColors: Record<string, [number, number, number]> = {
    blue: [0.45, 0.64, 1],
    violet: [0.79, 0.57, 0.86],
    emerald: [0.39, 0.82, 0.59],
    rust: [1, 0.58, 0.42],
  }

  const colors = colorMode.value === 'dark' ? darkColors : lightColors
  return colors[currentTheme.value] ?? colors.blue!
})

const ditherBaseColor = computed<[number, number, number]>(() => (
  colorMode.value === 'dark'
    ? [0.067, 0.086, 0.102]
    : [0.953, 0.965, 0.973]
))
</script>

<template>
  <!--
  THESIS: Work is browsed as a quiet horizontal shelf, not sold through a personal-brand hero or recruitment funnel.
  OWN-WORLD: Cool tinted paper, graphite type, one muted route accent, narrow headings, hairline rules, and flat square project planes.
  STORY: Visitors meet Joseph, scan selected work, then wander into notes and talks with no conversion pressure.
  FIRST VIEWPORT: Compact identity upper left, navigation upper right, controlled open field, and a lower shelf with one wide active project plus two narrow projects.
  FORM: Shelf-led with Order, approved comp B of 3, seed key 6e5f3fcd.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
  -->
  <div class="site-root min-h-dvh">
    <Dither
      v-if="hasHydrated"
      class="site-dither"
      aria-hidden="true"
      :wave-color="ditherColor"
      :base-color="ditherBaseColor"
      :wave-speed="0.055"
      :wave-frequency="2.2"
      :wave-amplitude="0.4"
      :color-num="5"
      :pixel-size="3"
      :enable-mouse-interaction="true"
      :mouse-radius="0.5"
    />
    <div class="site-content min-h-dvh">
      <NuxtRouteAnnouncer />
      <a href="#main-content" class="site-skip-link">Skip to content</a>
      <TheHeader />
      <main id="main-content" tabindex="-1">
        <NuxtLayout>
          <NuxtPage :transition="pageTransition" />
        </NuxtLayout>
      </main>
      <TheFooter />
    </div>
  </div>
</template>
