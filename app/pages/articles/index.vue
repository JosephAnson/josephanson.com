<script setup lang="ts">
const { data: articles } = await useAsyncData(() => queryCollection('articles').all())

useSeoMeta({
  title: 'Web Development Insights & Vue.js Tips',
  description: 'Gain insights into web development with a focus on Vue.js, discover industry trends, and pick up valuable tips to enhance your skill set.',
})
</script>

<template>
  <BaseContainer class="relative z-10 text-sm md:text-base">
    <div class="max-w-none pb-30 prose">
      <ProseH1>My Articles</ProseH1>

      <ArticleList v-if="articles" :articles="articles" />
    </div>
  </BaseContainer>
</template>
