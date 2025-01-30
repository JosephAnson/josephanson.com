<script setup lang="ts">
import type { Collections } from '@nuxt/content';

const props = defineProps<{
  article: Collections['articles']
}>()

const { classes } = useTheme()

const timeAgo = useTimeAgo(new Date(props.article.date))
</script>

<template>
  <li>
    <NuxtLink
      :to="article.path"
      class="group block transform transition-all duration-300 hover:scale-[1.02]"
    >
      <article
        v-if="article.path && article.title"
        :class="`${classes.card} p-6 rounded-xl flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`"
      >
        <div class="h-full flex flex-col">
          <div class="mb-2 flex items-start justify-between">
            <time
              class="text-xs font-medium"
              :datetime="article.date.toString()"
              :class="classes.textTint"
            >
              {{ timeAgo }}
            </time>
            <div class="i-ph:arrow-right text-lg" :class="classes.textTint" />
          </div>

          <h2
            :class="`text-xl font-bold mb-2 group-hover:underline ${classes.text}`"
          >
            {{ article.title }}
          </h2>

          <p :class="`line-clamp-3 text-sm mb-2 ${classes.text}`">
            {{ article.description }}
          </p>

          <div class="mt-auto">
            <BaseTagList
              class="mt-4"
              :tags="article.tags || []"
            />
          </div>
        </div>
      </article>
    </NuxtLink>
  </li>
</template>
