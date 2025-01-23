<script setup lang="ts">
import type { Article } from '~/types'
import { withTrailingSlash } from 'ufo'

const props = defineProps<{
  path: string
}>()

const { data: _articles } = await useAsyncData(
  'blog-articles',
  async () => (await queryContent(withTrailingSlash(props.path)).find()).reverse() as unknown as Article[],
  {
    watch: [() => props.path],
  },
)
</script>

<template>
  <div class="not-prose pb-16">
    <ul v-if="_articles?.length" class="not-prose slide-enter-content mt-8 block space-y-8">
      <BlogItem
        v-for="article in _articles"
        :key="article._id"
        :article="article"
      />
    </ul>
  </div>
</template>
