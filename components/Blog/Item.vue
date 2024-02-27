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
const id = computed(() => props.article?._id?.replaceAll(':', '').replaceAll('.', ''))
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
        <div class="group relative">
          <div class="mb-1 justify-between md:flex">
            <h2
              :class="`text-lg ${classes.text} font-semibold`"
              :style="`view-transition-name: blog-${id};`"
            >
              {{ article.title }}
            </h2>
            <time
              class="text-xs"
              :datetime="article.date"
              :class="classes.textTint"
            >
              {{ article.date }}
            </time>
          </div>

          <BaseTagList
            class="mb-1"
            :tags="article.categories"
            :style="`view-transition-name: blog-tags-${id};`"
          />
          <p :class="`line-clamp-3 mt-2 text-sm ${classes.text}`">
            {{ article.description }}
          </p>
        </div>
      </article>
    </NuxtLink>
  </li>
</template>
