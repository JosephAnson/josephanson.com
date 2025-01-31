<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  article: Collections['articles']
}>()

const { classes } = useTheme()

const timeAgo = useTimeAgo(new Date(props.article.date))
</script>

<template>
  <li>
    <BaseCard>
      <NuxtLink
        :to="article.path"
        class="group block h-full w-full"
      >
        <div class="h-full flex flex-col">
          <div class="mb-2 flex items-start justify-between">
            <time
              class="text-xs font-medium"
              :datetime="article.date.toString()"
              :class="classes.textLight"
            >
              {{ timeAgo }}
            </time>
            <div class="i-ph:arrow-right text-lg" :class="classes.textTint" />
          </div>

          <h2 class="mb-2 text-xl font-bold group-hover:underline" :class="classes.text">
            {{ article.title }}
          </h2>

          <p class="line-clamp-3 mb-2 text-sm" :class="classes.text">
            {{ article.description }}
          </p>

          <div class="mt-auto">
            <BaseTagList
              class="mt-4"
              :tags="article.tags || []"
            />
          </div>
        </div>
      </NuxtLink>
    </BaseCard>
  </li>
</template>
