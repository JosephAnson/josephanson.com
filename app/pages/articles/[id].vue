<script setup lang="ts">
const route = useRoute()
const { data: article } = await useAsyncData(route.path, () => {
  return queryCollection('articles').path(route.path).first()
})

const { classes } = useTheme()

if (article.value && article.value.seo.image) {
  useHead({
    meta: [
      { property: 'og:image', content: article.value.seo.image.toString() },
    ],
  })
}

const parentPath = computed(() => {
  const pathTable = route.path.split('/')
  pathTable.pop()
  return pathTable.join('/') || '/'
})

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description,
})
</script>

<template>
  <article class="slide-enter-content relative max-w-3xl pb-30 prose md:pb-100 dark:prose-invert">
    <div class="not-prose">
      <NuxtLink
        :to="parentPath"
        class="inline-flex items-center text-sm"
        :class="classes.link"
      >
        <div class="i-ph:arrow-left mr-2 h-4 w-4" />
        <span>
          Back
        </span>
      </NuxtLink>
    </div>

    <ProseH1>
      {{ article?.title }}
    </ProseH1>

    <div class="relative m-auto">
      <ContentRenderer v-if="article" :value="article" class="slide-enter-content" />
    </div>

    <BaseTagList class="mt-6" :tags="article?.tags || []" />
  </article>
</template>
