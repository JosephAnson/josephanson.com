<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  projects: Collections['projects'][]
  headingLevel?: 'h2' | 'h3'
}>()
</script>

<template>
  <ul class="work-grid">
    <li v-for="project in projects" :key="project.id">
      <ProjectItem :project="project" :heading-level="headingLevel" />
    </li>
  </ul>
</template>
