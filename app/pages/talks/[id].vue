<script setup lang="ts">
const route = useRoute()
const { data: talk } = await useAsyncData(route.path, () => {
  return queryCollection('talks').path(route.path).first()
})

const { classes } = useTheme()

if (talk.value && talk.value.seo.image) {
  useHead({
    meta: [
      { property: 'og:image', content: talk.value.seo.image.toString() },
    ],
  })
}

const parentPath = computed(() => {
  const pathTable = route.path.split('/')
  pathTable.pop()
  return pathTable.join('/') || '/'
})

useSeoMeta({
  title: talk.value?.title,
  description: talk.value?.description,
})
</script>

<template>
  <article class="slide-enter-content relative pb-30 md:pb-100">
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

    <div class="grid-cols-2 w-full gap-12 md:grid">
      <div class="mt-4 w-full">
        <iframe v-if="talk?.url" :src="talk.url" class="aspect-video w-full border border-gray-200" />

        <div class="mt-2 text-sm">
          Tip: Use the arrow keys to navigate through the presentation in the iframe.
        </div>
      </div>

      <div class="prose">
        <ProseH1>
          {{ talk?.title }}
        </ProseH1>

        <div class="relative m-auto">
          <ContentRenderer v-if="talk" :value="talk" />
        </div>
      </div>
    </div>
  </article>
</template>
