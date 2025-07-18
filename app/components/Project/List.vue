<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  projects: Collections['projects'][]
}>()
</script>

<template>
  <ul class="not-prose slide-enter-content grid list-none gap-6 lg:grid-cols-3 sm:grid-cols-2">
    <li v-for="project in projects" :key="project.id">
      <ProjectItem
        :project="project"
      />
    </li>
  </ul>
</template>
