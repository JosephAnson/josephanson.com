<script setup lang="ts">
const props = defineProps< {
  title: string
  description: string
  image?: string
  link: string
}>()

const colorMode = useColorMode()
const { classes } = useTheme()
const color = computed(() => colorMode.preference)

const { data: imageUrl } = await useFetch(`/screenshot`, {
  query: {
    colorMode: color,
    url: props.link,
    title: props.title,
  },
  watch: [() => colorMode.preference],
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
  <li class="inline-flex">
    <NuxtLink
      v-bind="bindProps"
      :to="props.link"
      :class="`relative w-full overflow-hidden rounded ${classes.card}`"
    >
      <div class="aspect-video">
        <NuxtImg
          width="400"
          class="aspect-video w-full object-cover"
          :src="imageUrl!"
          :alt="`Screenshot of ${props.title} website`"
          :placeholder="[50, 25, 75, 5]"
          format="webp"
        />
      </div>
      <div class="p-4">
        <div class="flex justify-between">
          <h2 :class="`mb-1 block text-lg font-bold ${classes.textLight}`">
            {{ props.title }}
          </h2>
          <span class="i-ph:arrow-square-in-duotone" />
        </div>
        <p>
          {{ props.description }}
        </p>
      </div>
    </NuxtLink>
  </li>
</template>
