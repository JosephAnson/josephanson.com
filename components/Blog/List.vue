<script setup lang="ts">
import { withTrailingSlash } from 'ufo'
import type { Article } from '~/types'

const props = defineProps<{
  path: string
}>()

const { data: _articles } = await useAsyncData(
  'blog-articles',
  async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find() as unknown as Article[],
  {
    watch: [() => props.path],
  },
)
</script>

<template>
  <div class="not-prose">
    <ul v-if="_articles?.length" class="not-prose slide-enter-content mt-8 block space-y-8">
      <BlogItem
        v-for="article in _articles"
        :key="article._id"
        :article="article"
      />
    </ul>
  </div>
</template>
