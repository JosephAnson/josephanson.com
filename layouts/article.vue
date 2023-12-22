<script setup lang="ts">
const { page } = useContent()
const route = useRoute()

const article = ref<HTMLElement | null>(null)
const windowScroll = useWindowScroll()

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
      <div class="fixed bottom-3 right-3 block flex items-center justify-end">
        <div
          :class="{
            'opacity-100': windowScroll.y.value >= 100,
          }"
          class="h-8 w-8 flex cursor-pointer items-center justify-center rounded-full bg-black:50 text-lg opacity-0 transition" @click.prevent.stop="onBackToTop"
        >
          <span class="sr-only">{{ 'Back to top' }}</span>
          <div class="i-ph:arrow-up-duotone text-2xl color-white" />
        </div>
      </div>
    </div>
  </article>
</template>
