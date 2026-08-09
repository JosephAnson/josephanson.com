<script setup lang="ts">
const { data: home } = await useAsyncData('home', () => queryCollection('content').path('/').first())
const {
  data: talks,
  error: talksError,
  status: talksStatus,
  refresh: refreshTalks,
} = await useAsyncData('home-talks', () => queryCollection('talks').limit(1).order('date', 'DESC').all())
const {
  data: projects,
  error: projectsError,
  status: projectsStatus,
  refresh: refreshProjects,
} = await useAsyncData('home-projects', () => queryCollection('projects').order('date', 'DESC').limit(3).all())
const {
  data: articles,
  error: articlesError,
  status: articlesStatus,
  refresh: refreshArticles,
} = await useAsyncData('home-articles', () => queryCollection('articles').limit(3).order('date', 'DESC').all())

const contextSection = useTemplateRef<HTMLElement>('context-section')
const hasContextEntered = ref(false)
let contextObserver: IntersectionObserver | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    hasContextEntered.value = true
    return
  }

  contextObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting)
      return

    hasContextEntered.value = true
    contextObserver?.disconnect()
  }, {
    rootMargin: '0px 0px 8% 0px',
    threshold: 0.12,
  })

  if (contextSection.value)
    contextObserver.observe(contextSection.value)
})

onBeforeUnmount(() => contextObserver?.disconnect())

useSeoMeta({
  title: home.value?.seo?.title,
  description: home.value?.seo?.description,
})
</script>

<template>
  <div class="home-page quiet-arrival">
    <HomeProjectShelf v-if="projects?.length" :projects="projects" />
    <section v-else class="home-work-shelf" aria-label="Selected work status">
      <BaseDataState
        v-if="projectsError"
        kind="error"
        heading-level="h1"
        title="Selected work couldn’t be loaded."
        description="The project shelf is temporarily unavailable. Try loading it again."
        action-label="Try again"
        :busy="projectsStatus === 'pending'"
        @action="refreshProjects"
      />
      <BaseDataState
        v-else
        kind="empty"
        heading-level="h1"
        title="Selected work is being arranged."
        description="The project shelf is empty for now. Notes and talks are still available below."
      />
    </section>

    <section
      ref="context-section"
      class="home-context motion-section motion-section-split"
      :class="{ 'is-in-view': hasContextEntered }"
      aria-labelledby="home-context-title"
    >
      <h2 id="home-context-title" class="page-title home-context-title">
        <span class="home-context-title-word">Systems,</span>
        <span class="home-context-title-word">products,</span>
        <span class="home-context-title-word">experiments.</span>
      </h2>
      <div class="home-context-copy">
        <p>
          I’m a frontend engineer in Madrid, and one of two people shaping
          <a href="https://nordhealth.design/" target="_blank" rel="noopener noreferrer" class="site-link">Nord Design System</a>
          at Nordhealth. This site is where useful ideas and strange little experiments end up.
        </p>
      </div>
    </section>

    <section v-if="articlesError || articles?.length" class="home-notes motion-section motion-section-list" aria-labelledby="home-notes-title">
      <div class="section-heading-row">
        <h2 id="home-notes-title" class="page-title">
          Recent notes
        </h2>
        <NuxtLink to="/articles" class="site-link">
          All notes
          <span class="i-ph:arrow-right h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <BaseDataState
        v-if="articlesError"
        kind="error"
        title="Recent notes couldn’t be loaded."
        description="This section is temporarily unavailable. Try loading it again."
        action-label="Try again"
        :busy="articlesStatus === 'pending'"
        @action="refreshArticles"
      />
      <ArticleList v-else-if="articles" :articles="articles" heading-level="h3" />
    </section>

    <section v-if="talksError || talks?.[0]" class="home-talk motion-section motion-section-media" aria-labelledby="home-talk-title">
      <div class="section-heading-row">
        <h2 id="home-talk-title" class="page-title">
          Latest talk
        </h2>
        <NuxtLink to="/talks" class="site-link">
          All talks
          <span class="i-ph:arrow-right h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <BaseDataState
        v-if="talksError"
        kind="error"
        title="The latest talk couldn’t be loaded."
        description="This section is temporarily unavailable. Try loading it again."
        action-label="Try again"
        :busy="talksStatus === 'pending'"
        @action="refreshTalks"
      />
      <TalkItem v-else-if="talks?.[0]" :talk="talks[0]" heading-level="h3" />
    </section>
  </div>
</template>
