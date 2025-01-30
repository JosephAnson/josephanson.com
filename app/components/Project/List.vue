<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  projects: Collections['projects'][]
}>()
</script>

<template>
  <ul class="slide-enter-content not-prose grid mt-8 list-none gap-4 p-0 pb-20 lg:grid-cols-3 sm:grid-cols-2">
    <ProjectItem
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </ul>
</template>
