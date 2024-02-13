<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/animations.css'

const theme = useTheme()

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
    :class="`text-${theme}-950 dark:text-${theme}-50 h-100dvh flex flex-col bg-${theme}-100 dark:bg-${theme}-950 transition-all`"
  >
    <div class="flex flex-grow-1 flex-col of-x-hidden pb-30">
      <TheHeader />

      <BaseContainer class="relative z-1 text-sm md:text-base">
        <NuxtLayout>
          <NuxtPage class="font-sans" />
        </NuxtLayout>
      </BaseContainer>

      <span class="flex-auto" />
    </div>

    <TheFooter />
  </div>
</template>
