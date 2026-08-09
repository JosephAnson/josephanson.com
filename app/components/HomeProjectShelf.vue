<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  projects: Collections['projects'][]
}>()

const activeIndex = ref(0)
const { projectScreenshot } = useProjectScreenshot()

const gridTemplate = computed(() => props.projects
  .map((_, index) => index === activeIndex.value ? 'minmax(22rem, 2.35fr)' : 'minmax(9rem, 0.68fr)')
  .join(' '))

function isExternal(link?: string) {
  return Boolean(link && /^https?:\/\//.test(link))
}

function select(index: number) {
  activeIndex.value = index
}

function hideBrokenImage(event: Event) {
  if (event.currentTarget instanceof HTMLImageElement)
    event.currentTarget.hidden = true
}
</script>

<template>
  <section aria-labelledby="selected-work-title" class="home-work-shelf">
    <h1 id="selected-work-title" class="site-visually-hidden">
      Selected work
    </h1>

    <ul
      class="project-shelf"
      :style="{ '--shelf-columns': gridTemplate }"
      @mouseleave="select(activeIndex)"
    >
      <li
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-shelf-item"
        :class="{ 'is-active': index === activeIndex }"
        :style="{ '--motion-index': index }"
        @pointerenter="select(index)"
        @focusin="select(index)"
      >
        <span class="project-shelf-index" aria-hidden="true">
          {{ (index + 1).toString().padStart(2, '0') }}
        </span>

        <NuxtLink
          :to="project.link || '/projects'"
          :target="isExternal(project.link) ? '_blank' : undefined"
          :rel="isExternal(project.link) ? 'noopener noreferrer' : undefined"
          class="project-shelf-link"
          :aria-label="`${project.title}${isExternal(project.link) ? ', opens in a new tab' : ''}`"
        >
          <h2 class="project-title">
            {{ project.title }}
          </h2>

          <div class="project-shelf-media" aria-hidden="true">
            <img
              class="project-shelf-image"
              :src="projectScreenshot(project.title)"
              alt=""
              width="1600"
              height="900"
              :loading="index === 0 ? 'eager' : 'lazy'"
              decoding="async"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              @error="hideBrokenImage"
            >
          </div>

          <Transition name="shelf-copy">
            <p v-if="index === activeIndex" class="project-shelf-description">
              {{ project.description }}
            </p>
          </Transition>

          <span class="project-shelf-arrow" aria-hidden="true">
            <span class="i-ph:arrow-right h-5 w-5" />
          </span>
        </NuxtLink>
      </li>
    </ul>

    <NuxtLink to="/projects" class="home-all-work site-link">
      All work
      <span class="i-ph:arrow-down-right h-4 w-4" aria-hidden="true" />
    </NuxtLink>
  </section>
</template>
