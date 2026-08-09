<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  project: Collections['projects']
  headingLevel?: 'h2' | 'h3'
}>()

const { projectScreenshot } = useProjectScreenshot()
const screenshotUrl = computed(() => projectScreenshot(props.project.title, 1200))

function hideBrokenImage(event: Event) {
  if (event.currentTarget instanceof HTMLImageElement)
    event.currentTarget.hidden = true
}
</script>

<template>
  <component
    :is="project.link ? 'a' : 'article'"
    :href="project.link"
    :target="project.link ? '_blank' : undefined"
    :rel="project.link ? 'noopener noreferrer' : undefined"
    class="work-card h-full"
  >
    <div class="work-card-media" aria-hidden="true">
      <img
        :src="screenshotUrl"
        alt=""
        class="work-card-image"
        width="1200"
        height="750"
        loading="lazy"
        decoding="async"
        draggable="false"
        @error="hideBrokenImage"
      >
    </div>

    <div class="work-card-heading">
      <component :is="headingLevel ?? 'h2'" class="work-card-title">
        {{ project.title }}
      </component>
      <span v-if="project.link" class="work-card-arrow" aria-hidden="true">
        <span class="i-ph:arrow-up-right h-5 w-5" />
      </span>
    </div>

    <p class="work-card-description">
      {{ project.description }}
    </p>

    <ul class="work-card-tech" aria-label="Technologies">
      <li v-for="technology in project.technologies.slice(0, 4)" :key="technology">
        {{ technology }}
      </li>
    </ul>
  </component>
</template>
