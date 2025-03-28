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
  <div class="h-full w-full inline-flex">
    <NuxtLink
      v-bind="bindProps"
      :to="project?.link"
      class="group block h-full w-full"
    >
      <BaseCard
        :image="{ src: imageUrl, alt: `Screenshot of ${project.title} website` }"
        content-class="flex flex-col flex-1"
        :tags="project?.technologies"
      >
        <div class="flex flex-1">
          <div class="flex-1">
            <div class="mb-2 flex items-center justify-between">
              <h2 class="text-xl font-bold" :class="classes.textLight">
                {{ project.title }}
              </h2>
            </div>

            <p class="line-clamp-3 mb-3 text-sm" :class="classes.text">
              {{ project.description }}
            </p>
          </div>
          <span v-if="project?.link" class="i-ph:arrow-square-in-duotone text-xl transition-transform duration-300 group-hover:translate-x-1" :class="classes.textLight" />
        </div>

        <div v-if="project?.link" class="flex items-center gap-2 text-xs" :class="classes.textLight">
          <span class="i-ph:link-simple-duotone" />
          <span>Visit Project</span>
        </div>
      </BaseCard>
    </NuxtLink>
  </div>
</template>
