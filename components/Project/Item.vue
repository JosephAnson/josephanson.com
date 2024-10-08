<script setup lang="ts">
const props = defineProps<{
  id: string
  title: string
  description: string
  image?: string
  link: string
}>()

const colorMode = useColorMode()
const { classes } = useTheme()

function isHttpUrl(string: string) {
  let url
  try {
    url = new URL(string)
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

const bindProps: { target?: '_blank' } = {}

if (isHttpUrl(props.link))
  bindProps.target = '_blank'

const imageUrl = computed(() => `http://storage.josephanson.com:9000/screenshots/${props.id}-${colorMode.preference}.jpg`)
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
          :src="imageUrl"
          :alt="`Screenshot of ${props.title} website`"
          :placeholder="[50, 25, 75, 5]"
          format="webp"
        />
        <!-- Force prerender of light mode image -->
        <NuxtImg
          class="hidden"
          width="400"
          :src="`http://storage.josephanson.com:9000/screenshots/${props.id}-light.jpg`"
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
