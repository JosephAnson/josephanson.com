<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/animations.css'

const currentTheme = useCurrentTheme()

useHead({
  title: appName,
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'view-transition',
      content: 'same-origin',
    },
  ],
  htmlAttrs: {
    class: 'flex flex-col h-100vh overflow-hidden',
  },
  bodyAttrs: {
    class: () => [
      `transition bg-gradient-to-b`,
      `from-${currentTheme.value}-200 via-${currentTheme.value}-100 to-${currentTheme.value}-50`,
      `dark:from-${currentTheme.value}-800 dark:via-${currentTheme.value}-900 dark:to-${currentTheme.value}-950`,
      `text-${currentTheme.value}-950 dark:text-${currentTheme.value}-50`,
    ].join(' '),
  },
})
</script>

<template>
  <div class="h-100vh of-y-auto scroll-smooth pb-20">
    <TheHeader />

    <main>
      <BaseContainer class="relative z-8 text-sm md:text-base">
        <NuxtPage />
      </BaseContainer>
    </main>

    <TheFooter />
  </div>
</template>
