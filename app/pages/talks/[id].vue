<script setup lang="ts">
const route = useRoute()
const { data: talk, error } = await useAsyncData(route.path, () => queryCollection('talks').path(route.path).first())

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Unable to load this talk',
    cause: error.value,
  })
}

if (!talk.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Talk not found',
  })
}

if (talk.value?.seo?.image) {
  useHead({
    meta: [{ property: 'og:image', content: talk.value.seo.image.toString() }],
  })
}

const formattedDate = computed(() => talk.value
  ? new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(talk.value.date))
  : '')

useSeoMeta({
  title: talk.value?.title,
  description: talk.value?.description,
})
</script>

<template>
  <article v-if="talk" class="content-page content-page-wide quiet-arrival">
    <NuxtLink to="/talks" class="content-back site-link">
      <span class="i-ph:arrow-left h-4 w-4" aria-hidden="true" />
      Talks
    </NuxtLink>

    <header class="content-header talk-content-header">
      <p class="page-kicker">
        {{ talk.event }} · {{ talk.location }} · {{ formattedDate }}
      </p>
      <h1 class="content-title">
        {{ talk.title }}
      </h1>
      <p class="content-deck">
        {{ talk.description }}
      </p>
    </header>

    <div class="talk-detail-grid">
      <section aria-labelledby="slides-title">
        <div class="content-section-heading">
          <h2 id="slides-title">
            Slides
          </h2>
          <a :href="talk.url" target="_blank" rel="noopener noreferrer" class="site-link">
            Open separately
          </a>
        </div>
        <iframe
          :title="`Presentation slides for ${talk.title}`"
          :src="talk.url"
          class="talk-frame"
          loading="lazy"
        />
      </section>

      <div class="talk-detail-copy">
        <section aria-labelledby="about-talk-title" class="prose">
          <h2 id="about-talk-title">
            About this talk
          </h2>
          <ContentRenderer :value="talk" />
        </section>

        <section v-if="talk.resources?.length" aria-labelledby="resources-title" class="talk-resources">
          <h2 id="resources-title">
            Resources
          </h2>
          <ul>
            <li v-for="resource in talk.resources" :key="resource.url">
              <a :href="resource.url" target="_blank" rel="noopener noreferrer" class="site-link">
                {{ resource.title }}
                <span class="i-ph:arrow-up-right h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </article>
</template>
