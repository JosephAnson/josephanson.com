<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/animations.css'
import TheWaves from '~/components/TheWaves.vue'

const theme = useTheme() // text-primary-950 text-secondary-950 dark:text-primary-50 dark:text-secondary-50

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
  <div :class="`text-${theme}-950 h-100dvh flex flex-col bg-white dark:bg-black dark:text-${theme}-50`">
    <div class="flex flex-grow-1 flex-col of-x-hidden pb-30">
      <TheHeader />

      <BaseContainer class="relative z-1 text-sm md:text-base">
        <NuxtLayout>
          <NuxtPage class="font-sans" />
        </NuxtLayout>
      </BaseContainer>
      <span class="flex-auto" />
    </div>

    <TheFooter class="absolute bottom-0 z-4 w-full pb-6 md:mb-16" />

    <TheWaves />
  </div>
</template>
