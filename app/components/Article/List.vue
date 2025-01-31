<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  articles: Collections['articles'][]
}>()
</script>

<template>
  <ul v-if="articles?.length" class="not-prose slide-enter-content block space-y-8">
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </ul>
</template>
