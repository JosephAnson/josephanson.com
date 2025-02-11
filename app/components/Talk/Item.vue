<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  talk: Collections['talks']
}>()

const { classes } = useTheme()

const timeAgo = useTimeAgo(new Date(props.talk.date))
</script>

<template>
  <li>
    <BaseCard>
      <NuxtLink
        :to="talk.path || talk.url"
        class="group block h-full w-full"
      >
        <div class="h-full flex flex-col">
          <h2 class="mb-2 text-xl font-bold group-hover:underline">
            {{ talk.title }}
          </h2>

          <p class="line-clamp-3 mb-4 text-sm">
            {{ talk.description }}
          </p>

          <div class="flex flex-wrap justify-between gap-4" :class="classes.textLight">
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center gap-2 text-xs">
                <span class="i-ph:calendar-star-duotone" />
                <span>{{ talk?.event }}</span>
              </div>

              <div class="flex items-center gap-2 text-xs">
                <span class="i-ph:map-pin-duotone" />
                <span>{{ talk.location }}</span>
              </div>
            </div>

            <div class="flex items-center gap-2 text-xs">
              <span class="i-ph-clock-countdown-duotone" />
              <span>{{ timeAgo }}</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </BaseCard>
  </li>
</template>
