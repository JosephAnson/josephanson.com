<script setup lang="ts">
const { page } = useContent()
const route = useRoute()

const article = ref<HTMLElement | null>(null)
const { classes } = useTheme()

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
  <BaseContainer class="relative z-10 text-sm md:text-base">
    <article ref="article" class="slide-enter-content relative max-w-3xl pb-30 prose md:pb-100">
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
        {{ page.title }}
      </ProseH1>

      <div class="relative m-auto">
        <slot />
      </div>

      <BaseTagList class="mt-6" :tags="page.categories" />
    </article>
  </BaseContainer>
</template>
