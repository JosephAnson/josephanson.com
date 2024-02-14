<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/animations.css'

const { currentTheme } = useTheme()

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
})
</script>

<template>
  <div
    :class="`text-${currentTheme}-950 dark:text-${currentTheme}-50 h-100dvh flex flex-col bg-${currentTheme}-100 dark:bg-${currentTheme}-950 transition-all duration-500`"
  >
    <div class="flex flex-grow-1 flex-col of-x-hidden pb-30">
      <TheHeader />

      <BaseContainer class="relative z-1 text-sm md:text-base">
        <NuxtPage class="font-sans" />
      </BaseContainer>

      <span class="flex-auto" />
    </div>

    <TheFooter />
  </div>
</template>
