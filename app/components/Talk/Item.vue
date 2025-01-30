<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  talk: Collections['talks']
}>()

const { classes } = useTheme()

const timeAgo = useTimeAgo(new Date(props.talk.date))
</script>

<template>
  <NuxtLink
    :to="talk.path"
    class="group block h-full"
  >
    <article
      v-if="talk.path && talk.title"
      :class="`${classes.card} p-6 rounded-xl flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative`"
    >
      <div class="absolute inset-0 from-transparent to-black/50 bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div class="relative z-10 h-full flex flex-col">
        <div class="mb-2 flex items-start justify-between">
          <time
            v-if="talk.date"
            class="text-xs font-medium"
            :datetime="talk.date.toString()"
            :class="classes.textTint"
          >
            {{ timeAgo }}
          </time>
          <div class="i-ph:arrow-right text-lg" :class="classes.textTint" />
        </div>

        <h2
          :class="`text-xl font-bold mb-2 group-hover:underline ${classes.text}`"
        >
          {{ talk.title }}
        </h2>

        <p :class="`line-clamp-3 text-sm mb-4 ${classes.text}`">
          {{ talk.description }}
        </p>

        <div class="mt-auto">
          <div v-if="talk.url" class="flex items-center gap-2">
            <div class="i-ph:link text-sm" :class="classes.textTint" />
            <a
              :href="talk.url"
              target="_blank"
              rel="noopener noreferrer"
              :class="`text-sm font-medium hover:underline ${classes.textTint}`"
              @click.stop
            >
              View Talk
            </a>
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
