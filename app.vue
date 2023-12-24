<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/animations.css'
import './styles/rays.css'

useHead({
  title: appName,
})
</script>

<template>
  <AppLayout>
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="rays absolute opacity-50 -inset-[30px]" />
    </div>
    <NuxtPage class="font-sans" />
  </AppLayout>
</template>
