<script setup lang="ts">
const props = defineProps< {
  title: string
  description: string
  image?: string
  link: string
}>()

const theme = useTheme()

// color-primary-800 color-secondary-800
// dark:color-primary-500 dark:color-secondary-500
</script>

<template>
  <NuxtLink :to="props.link" class="relative z-1 rounded bg-secondary-800:10 p-4 dark:bg-secondary-300:10">
    <h3 :class="`mb-1 block text-lg color-${theme}-800 font-bold dark:color-${theme}-500`">
      {{ props.title }}
    </h3>
    <p>
      {{ props.description }}
    </p>
  </NuxtLink>
</template>
