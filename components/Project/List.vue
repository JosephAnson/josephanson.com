<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  path: string
}>()

const { data: _articles } = await useAsyncData(
  'articles',
  async () => await queryContent('projects').where({ _dir: { $not: '' } }).find() as unknown as Project[],
  {
    watch: [() => props.path],
  },
)
</script>

<template>
  <ul class="slide-enter-content not-prose grid mt-8 list-none gap-4 p-0 pb-20 lg:grid-cols-3 sm:grid-cols-2">
    <ProjectItem
      v-for="article in _articles"
      :id="article.title.toLowerCase().replaceAll(/[ &]/gi, '-').replaceAll(/---/gi, '-')"
      :key="article._id"
      :title="article.title"
      :description="article.description"
      :image="article.image"
      :link="article.link"
    />
  </ul>
</template>
