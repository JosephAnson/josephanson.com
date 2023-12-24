<script setup lang="ts">
defineProps({
  padded: {
    type: Boolean,
    default: true,
  },
})

useHead({
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <Container class="app-layout min-h-screen flex flex-col text-sm md:text-base">
    <AppLoadingBar />
    <AppHeader />
    <slot />
    <span class="flex-auto" />
    <AppFooter />
  </Container>
</template>
