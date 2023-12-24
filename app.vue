<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/animations.css'

useHead({
  title: appName,
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-black p-2 dark:bg-white md:p-3">
    <div class="relative flex flex-auto of-hidden rounded-xl bg-white py-8 dark:bg-black md:py-16">
      <TheRays />
      <Container class="flex flex-col text-sm md:text-base">
        <TheLoadingBar />
        <TheHeader />

        <NuxtPage class="font-sans" />
        <span class="flex-auto" />
        <TheFooter />
      </Container>
    </div>
  </div>
</template>
