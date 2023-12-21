<script setup lang="ts">
const { page } = useContent()
const route = useRoute()

const article = ref<HTMLElement | null>(null)

if (page.value && page.value.cover) {
  useHead({
    meta: [
      { property: 'og:image', content: page.value.cover },
    ],
  })
}

const parentPath = computed(() => {
  const pathTable = route.path.split('/')
  pathTable.pop()
  return pathTable.join('/') || '/'
})

function onBackToTop() {
  article.value?.scrollIntoView({
    behavior: 'smooth',
  })
}
</script>

<template>
  <article ref="article">
    <NuxtLink
      :to="parentPath"
      class="back border-elements-border-secondary-static inline-flex items-center border-b text-lg"
    >
      <div class="i-ph:arrow-left mr-2 h-4 w-4" />
      <span>
        Back
      </span>
    </NuxtLink>

    <header class="mb-12 mt-16">
      <h1
        v-if="page?.title"
        class="title mb-4 text-5xl font-semibold leading-tight"
      >
        {{ page.title }}
      </h1>
    </header>

    <div class="prose">
      <slot />
      <div class="back-to-top w-full flex items-center justify-end">
        <ProseA class="cursor-pointer text-lg" @click.prevent.stop="onBackToTop">
          {{ 'Back to top' }}
          <div class="i-material-symbols:arrow-upward" />
        </ProseA>
      </div>
    </div>
  </article>
</template>
