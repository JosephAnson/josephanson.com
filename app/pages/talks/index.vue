<script setup lang="ts">
const { data: talks } = await useAsyncData(() => queryCollection('talks').order('date', 'DESC').all())

useSeoMeta({
  title: 'Conference & Meetup Talks',
  ogTitle: 'Insightful Tech Talks by Joseph Anson',
  description: 'Discover engaging conference and meetup presentations by Joseph Anson, covering cutting-edge topics in software engineering. Explore slides, videos, and resources from past events.',
  ogDescription: 'Dive into a collection of professional tech talks and presentations by Joseph Anson, featuring in-depth insights and practical knowledge from various conferences and meetups.',
})
</script>

<template>
  <ProseH1>My Talks</ProseH1>

  <TalkList v-if="talks" :talks="talks" class="pb-32 pt-8" />
</template>
