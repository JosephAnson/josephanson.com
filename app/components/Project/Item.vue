<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{ project: Collections['projects'] }>()

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

if (props.project?.link && isHttpUrl(props.project.link))
  bindProps.target = '_blank'

const imageUrl = computed(
  () => `http://storage.josephanson.com:9000/screenshots/${props.project.title.toLowerCase().replaceAll(/[ &]/g, '-').replaceAll(/---/g, '-')}-${colorMode.preference}.jpg`,
)
</script>

<template>
  <li class="h-full inline-flex">
    <BaseCard class="overflow-hidden p-0">
      <NuxtLink
        v-bind="bindProps"
        :to="project.link"
        class="group block h-full w-full"
      >
        <div class="relative aspect-video">
          <NuxtImg
            width="400"
            class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            :src="imageUrl"
            :alt="`Screenshot of ${project.title} website`"
            :placeholder="[50, 25, 75, 5]"
            format="webp"
          />
          <div class="absolute inset-0 from-black/50 to-transparent bg-gradient-to-t opacity-0 transition-opacity duration-300 group-hover:scale-105 group-hover:opacity-10" />
        </div>

        <div class="flex flex-1 flex-col justify-between p-4">
          <div>
            <div class="mb-2 flex items-center justify-between">
              <h2 class="text-xl font-bold" :class="classes.textLight">
                {{ project.title }}
              </h2>
              <span class="i-ph:arrow-square-in-duotone text-xl transition-transform duration-300 group-hover:translate-x-1" :class="classes.textLight" />
            </div>

            <p class="line-clamp-3 mb-3 text-sm" :class="classes.text">
              {{ project.description }}
            </p>
          </div>

          <div class="flex items-center gap-2 text-xs" :class="classes.textLight">
            <span class="i-ph:link-simple-duotone" />
            <span>Visit Project</span>
          </div>
        </div>
      </NuxtLink>
    </BaseCard>
  </li>
</template>
