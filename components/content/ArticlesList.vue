<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

const props = defineProps<{
  path: string
}>()

const { data: _articles } = await useAsyncData('articles', async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find())
</script>

<template>
  <ul v-if="_articles?.length" class="slide-enter-content not-prose mt-8 md:px-0 sm:px-12">
    <ArticlesListItem v-for="(article, index) in _articles" :key="index" :article="article" />
  </ul>
  <div v-else class="slide-enter-content tour w-full flex flex-col items-center justify-center">
    <p>Seems like there are no {{ props.path }} yet.</p>
  </div>
</template>
