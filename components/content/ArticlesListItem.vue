<script setup lang="ts">
import type { PropType } from 'vue'
import type { Article } from '~/types'

defineProps({
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
        <div class="flex items-center gap-x-4 text-xs">
          <BaseTagList :tags="article.categories" />
        </div>
        <div class="group relative">
          <h3 :class="`mt-3 text-lg ${classes.text} font-semibold`">
            <a :href="article._path">
              <span class="absolute inset-0" />
              {{ article.title }}
            </a>
          </h3>
          <time
            class="text-xs"
            :datetime="article.date"
            :class="classes.textTint"
          >
            {{ article.date }}
          </time>
          <p :class="`line-clamp-3 mt-2 text-sm ${classes.text}`">
            {{ article.description }}
          </p>
        </div>
      </article>
    </NuxtLink>
  </li>
</template>
