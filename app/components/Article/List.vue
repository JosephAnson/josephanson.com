<script setup lang="ts">
import type { Collections } from '@nuxt/content';

defineProps<{
  articles: Collections['articles'][]
}>()
</script>

<template>
  <div class="not-prose pb-16">
    <ul v-if="articles?.length" class="not-prose slide-enter-content mt-8 block space-y-8">
      <ArticleItem
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </ul>
  </div>
</template>
