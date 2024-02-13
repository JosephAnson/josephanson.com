<script setup lang="ts">
const props = defineProps< {
  title: string
  description: string
  image?: string
  link: string
}>()

const { currentTheme } = useTheme()

function isHttpUrl(string: string) {
  let url
  try {
    url = new URL(string)
  }
  catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

const bindProps: { target?: '_blank' } = {}

if (isHttpUrl(props.link))
  bindProps.target = '_blank'
</script>

<template>
  <NuxtLink v-bind="bindProps" :to="props.link" class="relative z-1 rounded bg-secondary-800:10 p-4 dark:bg-secondary-300:10">
    <h3 :class="`mb-1 block text-lg text-${currentTheme}-800 font-bold dark:text-${currentTheme}-500`">
      {{ props.title }}
    </h3>
    <p>
      {{ props.description }}
    </p>
  </NuxtLink>
</template>
