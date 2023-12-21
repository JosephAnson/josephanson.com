<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

const props = defineProps<{
  path: string
}>()

const { data: _articles } = await useAsyncData('articles', async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find())
</script>

<template>
  <div v-if="_articles?.length" class="md:px-0 sm:px-12">
    <ArticlesListItem v-for="(article, index) in _articles" :key="index" :article="article" />
  </div>
  <div v-else class="tour w-full flex flex-col items-center justify-center">
    <p>Seems like there are no {{ props.path }} yet.</p>
  </div>
</template>
