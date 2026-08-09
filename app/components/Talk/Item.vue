<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  talk: Collections['talks']
  headingLevel?: 'h2' | 'h3'
}>()

const imageFailed = shallowRef(false)

const formattedDate = computed(() => new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
}).format(new Date(props.talk.date)))
</script>

<template>
  <NuxtLink :to="talk.path || talk.url" class="talk-row">
    <div class="talk-row-copy">
      <p class="talk-meta">
        {{ talk.event }} · {{ talk.location }} · {{ formattedDate }}
      </p>
      <component :is="headingLevel ?? 'h2'" class="talk-title">
        {{ talk.title }}
      </component>
      <p class="talk-description">
        {{ talk.description }}
      </p>
      <span class="talk-open">
        View talk
        <span class="i-ph:arrow-right h-4 w-4" aria-hidden="true" />
      </span>
    </div>

    <div v-if="talk.image && !imageFailed" class="talk-image-wrap" aria-hidden="true">
      <NuxtImg :src="talk.image" alt="" class="talk-image" loading="lazy" @error="imageFailed = true" />
    </div>
  </NuxtLink>
</template>
