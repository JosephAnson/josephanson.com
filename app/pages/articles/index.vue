<script setup lang="ts">
const { data: articles } = await useAsyncData(() => queryCollection('articles').order('date', 'DESC').all())

useSeoMeta({
  title: 'Web Development Insights & Vue.js Tips',
  description: 'Gain insights into web development with a focus on Vue.js, discover industry trends, and pick up valuable tips to enhance your skill set.',
})
</script>

<template>
  <ProseH1>My Articles</ProseH1>

  <ArticleList v-if="articles" :articles="articles" class="mt-8 pb-32" />
</template>
