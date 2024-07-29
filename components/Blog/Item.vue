<script setup lang="ts">
import type { PropType } from 'vue'
import type { Article } from '~/types'

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
    validator: (value: Article) => {
      return !!(value?._path && value.title)
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
})

const { classes } = useTheme()

const timeAgo = useTimeAgo(new Date(props.article.date))
</script>

<template>
  <li>
    <NuxtLink
      :to="article._path"
      class="mb-2 block text-xl"
    >
      <article
        v-if="article._path && article.title"
        :class="`${classes.card} p-4 rounded flex flex-wrap items-center`"
      >
        <div class="group relative w-full">
          <div class="mb-1 justify-between md:flex">
            <h2
              :class="`text-lg ${classes.text} font-semibold`"
            >
              {{ article.title }}
            </h2>
            <time
              class="text-xs"
              :datetime="article.date"
              :class="classes.textTint"
            >
              {{ timeAgo }}
            </time>
          </div>

          <p :class="`line-clamp-3 text-sm ${classes.text}`">
            {{ article.description }}
          </p>

          <BaseTagList
            class="mt-4"
            :tags="article.categories"
          />
        </div>
      </article>
    </NuxtLink>
  </li>
</template>
