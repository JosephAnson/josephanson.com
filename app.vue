<template>
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<style>
html {
  font-family: $dt('font.sans');
}
</style>

<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>
