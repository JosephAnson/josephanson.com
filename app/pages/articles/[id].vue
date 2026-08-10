<script setup lang="ts">
const route = useRoute()
const { data: article, error } = await useAsyncData(route.path, () => queryCollection('articles').path(route.path).first())
const { data: articles } = await useAsyncData('articles:related', () => queryCollection('articles').order('date', 'DESC').all())

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Unable to load this note',
    cause: error.value,
  })
}

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Note not found',
  })
}

if (article.value?.seo?.image) {
  useHead({
    meta: [{ property: 'og:image', content: article.value.seo.image.toString() }],
  })
}

interface TocLink {
  id: string
  text: string
  depth?: number
  children?: TocLink[]
}

function countWords(node: unknown): number {
  if (typeof node === 'string')
    return node.trim().split(/\s+/u).filter(Boolean).length

  if (!node || typeof node !== 'object')
    return 0

  if (Array.isArray(node)) {
    const content = typeof node[0] === 'string' ? node.slice(2) : node
    return content.reduce((count, child) => count + countWords(child), 0)
  }

  const record = node as Record<string, unknown>
  return countWords(record.value)
}

const dateTime = computed(() => article.value ? new Date(String(article.value.date)).toISOString() : '')
const formattedDate = computed(() => article.value
  ? new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(String(article.value.date)))
  : '')
const readingMinutes = computed(() => Math.max(1, Math.ceil(countWords(article.value?.body) / 220)))
const tocLinks = computed(() => (article.value?.body?.toc?.links ?? []) as TocLink[])
const relatedArticle = computed(() => {
  if (!article.value?.related)
    return undefined

  return articles.value?.find(candidate => candidate.path === article.value?.related)
})

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description,
})
</script>

<template>
  <article v-if="article" class="content-page quiet-arrival">
    <NuxtLink to="/articles" class="content-back site-link">
      <span class="i-ph:arrow-left h-4 w-4" aria-hidden="true" />
      Notes
    </NuxtLink>

    <header class="content-header">
      <p class="content-meta">
        <time :datetime="dateTime">{{ formattedDate }}</time>
        <span class="content-meta-marker" aria-hidden="true" />
        <span>{{ readingMinutes }} min read</span>
      </p>
      <h1 class="content-title">
        {{ article.title }}
      </h1>
      <p class="content-deck">
        {{ article.description }}
      </p>
    </header>

    <div class="article-layout" :class="{ 'article-layout--with-nav': tocLinks.length >= 4 }">
      <ArticleSectionNav :links="tocLinks" />

      <div class="article-body prose">
        <ContentRenderer :value="article" />
      </div>
    </div>

    <BaseTagList v-if="article.tags?.length" class="content-tags" :tags="article.tags" />

    <nav class="content-continue" aria-label="Continue reading">
      <p>Continue reading</p>
      <NuxtLink v-if="relatedArticle" :to="relatedArticle.path" class="content-continue-featured">
        <span>{{ relatedArticle.title }}</span>
        <span class="i-ph:arrow-up-right h-5 w-5" aria-hidden="true" />
      </NuxtLink>
      <NuxtLink to="/articles" class="site-link content-continue-all">
        All notes
        <span class="i-ph:arrow-right h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </nav>
  </article>
</template>
