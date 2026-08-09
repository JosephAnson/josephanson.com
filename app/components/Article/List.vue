<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  articles: Collections['articles'][]
  headingLevel?: 'h2' | 'h3'
}>()
</script>

<template>
  <ul v-if="articles?.length" class="notes-list">
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
      :heading-level="headingLevel"
    />
  </ul>
</template>
