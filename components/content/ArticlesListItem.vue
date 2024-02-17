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
        <div class="flex items-center gap-x-4 text-xs">
          <BaseTagList
            :tags="article.categories"
          />
        </div>
        <div class="group relative">
          <h3
            :class="`mt-3 text-lg ${classes.text} font-semibold`"
          >
            <a
              :href="article._path"
              :style="`animation: 1s; view-transition-name: blog-${id}; contain: layout;`"
              class="!animate-duration-900 !animate-delay-75"
            >
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
