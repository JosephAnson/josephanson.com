<script setup lang="ts">
const { data: talks } = await useAsyncData(() => queryCollection('talks').order('date', 'DESC').all())

useSeoMeta({
  title: 'My Talks',
  description: 'Explore a curated selection of talks that I have given.',
})
</script>

<template>
  <ProseH1>My Talks</ProseH1>

  <TalkList v-if="talks" :talks="talks" />
</template>
