<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

const props = defineProps({
  path: {
    type: String,
    default: 'articles',
  },
})

const { data: _articles } = await useAsyncData('articles', async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find())

const articles = computed(() => _articles.value || [])
</script>

<template>
  <div v-if="articles?.length" class="md:px-0 sm:px-12">
    <ArticlesListItem v-for="(article, index) in articles" :key="index" :article="article" />
  </div>
  <div v-else class="tour min-h-[30vh] flex flex-col items-center justify-center">
    <p>Seems like there are no {{ props.path }} yet.</p>
    <p>
      You can start by
      <!-- eslint-disable-next-line -->
      <ProseA href="https://alpine.nuxt.space/articles/write-articles">creating</ProseA> one in the <ProseCodeInline>{{props.path}}</ProseCodeInline> folder.
    </p>
  </div>
</template>
