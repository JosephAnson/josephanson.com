<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/animations.css'

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
  <div class="h-100dvh flex flex-col bg-black p-2 dark:bg-white md:p-3">
    <div class="relative flex flex-auto flex-col of-hidden rounded-xl bg-white py-8 dark:bg-black md:py-16">
      <TheAnimation />

      <TheHeader />

      <div class="flex flex-grow-1 flex-col of-x-hidden of-y-auto">
        <BaseContainer class="relative z-1 text-sm md:text-base">
          <NuxtPage class="font-sans" />
        </BaseContainer>
        <span class="flex-auto" />
      </div>

      <TheFooter />
    </div>
  </div>
</template>
