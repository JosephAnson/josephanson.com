<script setup lang="ts">
import { onMounted, ref } from 'vue'

const route = useRoute()
const { data: talk } = await useAsyncData(route.path, () => {
  return queryCollection('talks').path(route.path).first()
})

const { classes } = useTheme()

const iframeRef = ref<HTMLIFrameElement | null>(null)

onMounted(() => {
  if (iframeRef.value) {
    iframeRef.value.focus()
  }
})

if (talk.value && talk.value.seo.image) {
  useHead({
    meta: [
      { property: 'og:image', content: talk.value.seo.image.toString() },
    ],
  })
}

const parentPath = computed(() => {
  const pathTable = route.path.split('/')
  pathTable.pop()
  return pathTable.join('/') || '/'
})

useSeoMeta({
  title: talk.value?.title,
  description: talk.value?.description,
})

const timeAgo = useTimeAgo(new Date(talk.value?.date || ''))
</script>

<template>
  <article class="slide-enter-content relative pb-30 md:pb-100">
    <NuxtLink
      :to="parentPath"
      class="inline-flex items-center text-sm"
      :class="classes.link"
    >
      <div class="i-ph:arrow-left mr-2 h-4 w-4" />
      <span>
        Back
      </span>
    </NuxtLink>

    <ProseH1>
      {{ talk?.title }}
    </ProseH1>

    <div class="mb-8 flex gap-4" :class="classes.textTint">
      <component
        :is="talk?.eventUrl ? 'a' : 'div'"
        :href="talk?.eventUrl"
        class="flex items-center gap-2 text-xs"
        :class="classes.textTint"
      >
        <span class="i-ph:calendar-star-duotone" />
        <span>{{ talk?.event }}</span>
      </component>

      <div class="flex items-center gap-2 text-xs">
        <span class="i-ph:map-pin-duotone" />
        <span>{{ talk?.location }}</span>
      </div>

      <div class="flex items-center gap-2 text-xs" :class="classes.textTint">
        <span class="i-ph-clock-countdown-duotone" />
        <span>{{ timeAgo }}</span>
      </div>
    </div>

    <div class="grid-cols-2 w-full gap-12 md:grid">
      <div class="w-full">
        <div class="mb-4">
          <ProseH2 class="mt-0">
            Slides
          </ProseH2>

          <iframe
            v-if="talk?.url"
            ref="iframeRef"
            :title="`Presentation slides for ${talk?.title}`"
            :src="talk.url"
            class="aspect-video w-full border border-gray-200"
          />

          <div class="mt-4 text-sm" :class="classes.textTint">
            Tip: swipe or use the arrow keys (<span class="i-ph:arrow-left-duotone" /> <span class="i-ph:arrow-right-duotone" />) to navigate through the presentation.
          </div>
        </div>

        <!-- Add video recording section -->
        <div v-if="talk?.recordingUrl" class="mb-8">
          <ProseH2>
            Video Recording
          </ProseH2>
          <a
            :href="talk.recordingUrl"
            class="hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
          >
            <span class="i-ph:video-duotone" />
            <span>Watch the full recording</span>
          </a>
        </div>
      </div>

      <div class="max-w-full prose">
        <ProseH2 class="mt-0">
          Description
        </ProseH2>

        <div class="relative m-auto">
          <ContentRenderer v-if="talk" :value="talk" class="slide-enter-content" />
        </div>

        <!-- Add resources section -->
        <div v-if="talk?.resources?.length" class="mt-6">
          <ProseH3>
            Resources
          </ProseH3>
          <ul class="space-y-2">
            <li v-for="resource in talk.resources" :key="resource.url" class="text-sm">
              <a :href="resource.url" class="hover:text-primary flex items-center gap-2 transition-colors">
                <span class="i-ph:link-simple" />
                <span>{{ resource.title || 'Resource Link' }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Add tags section -->
        <div v-if="talk?.tags?.length" class="mt-8 flex flex-wrap gap-2">
          <span
            v-for="tag in talk.tags"
            :key="tag"
            :class="classes.tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
