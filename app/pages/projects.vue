<script setup lang="ts">
const { data: projects } = await useAsyncData(() => queryCollection('projects').order('date', 'DESC').all())

useSeoMeta({
  title: 'My Portfolio Highlights',
  description: 'Explore a curated selection of projects that showcase my problem-solving skills and web development expertise.',
})
</script>

<template>
  <ProseH1>My Portfolio Highlights</ProseH1>

  <ProjectList v-if="projects" :projects="projects" />
</template>
