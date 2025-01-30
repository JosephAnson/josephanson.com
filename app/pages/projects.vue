<script setup lang="ts">
const { data: projects } = await useAsyncData(() => queryCollection('projects').all())

useSeoMeta({
  title: 'My Portfolio Highlights',
  description: 'Explore a curated selection of projects that showcase my problem-solving skills and web development expertise.',
})
</script>

<template>
  <BaseContainer class="relative z-10 text-sm md:text-base">
    <div class="max-w-none pb-30 prose">
      <ProseH1>My Portfolio Highlights</ProseH1>

      <ProjectList v-if="projects" :projects="projects" />
    </div>
  </BaseContainer>
</template>
