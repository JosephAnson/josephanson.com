<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import './styles/base.css'
import './styles/prose.css'

useHead({
  title: appName,
})
</script>

<template>
  <AppLayout>
    <NuxtPage class="font-sans" />
  </AppLayout>
</template>
