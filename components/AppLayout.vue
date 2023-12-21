<script setup lang="ts">

defineProps({
  padded: {
    type: Boolean,
    default: true
  }
})

useHead({
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})
</script>

<template>
  <Container class="app-layout">
    <AppLoadingBar />
    <AppHeader />
    <slot />
    <AppFooter  />
  </Container>
</template>

<style lang="ts" scoped>
css({
  '.app-layout': {
    minWidth: '{size.xs}'
  }
})
</style>
