<script setup lang="ts">
const route = useRoute()
const { data: article, error } = await useAsyncData(route.path, () => queryCollection('articles').path(route.path).first())

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

const formattedDate = computed(() => article.value
  ? new Intl.DateTimeFormat('en', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(article.value.date))
  : '')

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
      <p class="page-kicker">
        {{ formattedDate }}
      </p>
      <h1 class="content-title">
        {{ article.title }}
      </h1>
      <p class="content-deck">
        {{ article.description }}
      </p>
    </header>

    <div class="article-body prose">
      <ContentRenderer :value="article" />
    </div>

    <BaseTagList v-if="article.tags?.length" class="content-tags" :tags="article.tags" />
  </article>
</template>
