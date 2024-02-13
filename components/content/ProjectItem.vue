<script setup lang="ts">
const props = defineProps< {
  title: string
  description: string
  image?: string
  link: string
}>()
</script>

<template>
  <NuxtLink :to="props.link" class="rounded bg-secondary-800:10 p-4 dark:bg-secondary-300:10" target="_blank">
    <h3 class="mb-1 block text-lg color-secondary-800 font-bold dark:color-secondary-500">
      {{ props.title }}
    </h3>
    <p>
      {{ props.description }}
    </p>
  </NuxtLink>
</template>
