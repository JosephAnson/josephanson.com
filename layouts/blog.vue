<script setup lang="ts">
const { page } = useContent()
const route = useRoute()

const article = ref<HTMLElement | null>(null)
const { currentTheme } = useTheme()

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
</script>

<template>
  <article ref="article" class="relative max-w-3xl pb-10 prose">
    <div class="slide-enter-content not-prose">
      <NuxtLink
        :to="parentPath"
        class="absolute mb-8 inline-flex items-center text-sm -top-8"
        :class="`text-${currentTheme}-600 dark:text-${currentTheme}-400`"
      >
        <div class="i-ph:arrow-left mr-2 h-4 w-4" />
        <span>
          Back
        </span>
      </NuxtLink>
    </div>

    <div class="relative m-auto">
      <slot />
    </div>
  </article>
</template>
