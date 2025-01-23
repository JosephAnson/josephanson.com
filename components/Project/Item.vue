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
  <li class="h-full inline-flex">
    <NuxtLink
      v-bind="bindProps"
      :to="props.link"
      class="group block h-full transform transition-all duration-300 hover:scale-[1.02]"
    >
      <div :class="`relative w-full overflow-hidden rounded-xl ${classes.card} shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col`">
        <div class="relative aspect-video">
          <NuxtImg
            width="400"
            class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            :src="imageUrl"
            :alt="`Screenshot of ${props.title} website`"
            :placeholder="[50, 25, 75, 5]"
            format="webp"
          />
          <div class="absolute inset-0 from-black/50 to-transparent bg-gradient-to-t opacity-0 transition-opacity duration-300 group-hover:scale-105 group-hover:opacity-10" />
        </div>

        <div class="flex flex-1 flex-col justify-between p-4">
          <div>
            <div class="mb-2 flex items-center justify-between">
              <h2 :class="`text-xl font-bold ${classes.textLight}`">
                {{ props.title }}
              </h2>
              <span class="i-ph:arrow-square-in-duotone text-xl transition-transform duration-300 group-hover:translate-x-1" :class="classes.textTint" />
            </div>

            <p class="line-clamp-3 mb-3 text-sm" :class="classes.text">
              {{ props.description }}
            </p>
          </div>

          <div class="flex items-center gap-2 text-xs" :class="classes.textTint">
            <span class="i-ph:link-simple-duotone" />
            <span>Visit Project</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </li>
</template>
