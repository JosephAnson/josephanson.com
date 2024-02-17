<script setup lang="ts">
const props = defineProps< {
  title: string
  description: string
  image?: string
  link: string
}>()

const currentTheme = useCurrentTheme()
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
  <NuxtLink
    v-bind="bindProps"
    :to="props.link"
    :class="`relative overflow-hidden transition rounded bg-${currentTheme}-500:20 dark:bg-${currentTheme}-500:20`"
  >
    <div class="aspect-video">
      <NuxtImg
        width="400"
        class="aspect-video w-full object-cover"
        :src="imageUrl"
        :placeholder="[50, 25, 75, 5]"
      />
    </div>
    <div class="p-4">
      <h3 :class="`mb-1 block text-lg transition text-${currentTheme}-900 font-bold dark:text-${currentTheme}-200`">
        {{ props.title }}
      </h3>
      <p>
        {{ props.description }}
      </p>
    </div>
  </NuxtLink>
</template>
