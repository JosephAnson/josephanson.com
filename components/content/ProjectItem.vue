<script setup lang="ts">
const props = defineProps< {
  title: string
  description: string
  image?: string
  link: string
}>()

const { currentTheme } = useTheme()
const colorMode = useColorMode()
const color = computed(() => colorMode.preference)

const { data: imageUrl } = await useFetch(`/screenshot`, {
  query: {
    colorMode: color,
    url: props.link,
    title: props.title,
  },
  watch: [() => colorMode.value, currentTheme],
})

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
  <NuxtLink v-bind="bindProps" :to="props.link" class="relative z-1 overflow-hidden rounded bg-secondary-800:10 dark:bg-secondary-300:10">
    <NuxtImg
      v-if="imageUrl"
      width="400"
      class="aspect-video w-full object-cover"
      :src="imageUrl"
    />
    <div class="p-4">
      <h3 :class="`mb-1 block text-lg text-${currentTheme}-800 font-bold dark:text-${currentTheme}-500`">
        {{ props.title }}
      </h3>
      <p>
        {{ props.description }}
      </p>
    </div>
  </NuxtLink>
</template>
