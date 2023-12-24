<script setup lang="ts">
const props = defineProps< {
  title: string
  description: string
  image?: string
  link: string
}>()
</script>

<template>
  <NuxtLink :to="props.link" class="rounded bg-primary-100:40 p-4 dark:bg-primary-100:2" target="_blank">
    <h3 class="mb-1 block text-lg color-primary-500 font-bold">
      {{ props.title }}
    </h3>
    <p>
      {{ props.description }}
    </p>
  </NuxtLink>
</template>
