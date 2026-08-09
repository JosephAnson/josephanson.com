<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  article: Collections['articles']
  headingLevel?: 'h2' | 'h3'
}>()

const formattedDate = computed(() => new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date(props.article.date)))
</script>

<template>
  <li class="note-row">
    <NuxtLink :to="article.path" class="note-row-link">
      <time :datetime="article.date.toString()" class="note-date">
        {{ formattedDate }}
      </time>

      <div class="note-copy">
        <component :is="headingLevel ?? 'h2'" class="note-title">
          {{ article.title }}
        </component>
        <p>{{ article.description }}</p>
      </div>

      <span class="note-arrow" aria-hidden="true">
        <span class="i-ph:arrow-up-right h-5 w-5" />
      </span>
    </NuxtLink>
  </li>
</template>
