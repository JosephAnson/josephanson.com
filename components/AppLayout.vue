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
  <Container class="app-layout min-w-[calc(var(--size-xs))]">
    <AppLoadingBar />
    <AppHeader />
    <slot />
    <AppFooter />
  </Container>
</template>
