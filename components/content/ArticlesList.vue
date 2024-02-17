<script setup lang="ts">
import { withTrailingSlash } from 'ufo'
import type { Article } from '~/types'

const props = defineProps<{
  path: string
}>()

const { data: _articles } = await useAsyncData(
  'articles',
  async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find() as unknown as Article[],
  {
    watch: [() => props.path],
  },
)
</script>

<template>
  <div class="not-prose">
    <ul v-if="_articles?.length" class="slide-enter-content not-prose mt-8 space-y-8">
      <ArticlesListItem
        v-for="(article, index) in _articles"
        :key="index"
        :article="article"
      />
    </ul>
  </div>
</template>
