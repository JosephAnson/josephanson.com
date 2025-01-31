<script setup lang="ts">
const { data: home } = await useAsyncData('home', () => queryCollection('content').path('/').first())
const { data: talks } = await useAsyncData('home-talks', () => queryCollection('talks').limit(3).order('date', 'DESC').all())
const { data: projects } = await useAsyncData('home-projects', () => queryCollection('projects').limit(3).order('date', 'DESC').all())
const { data: articles } = await useAsyncData('home-articles', () => queryCollection('articles').limit(3).order('date', 'DESC').all())

useSeoMeta({
  title: home.value?.seo?.title,
  description: home.value?.seo?.description,
})
</script>

<template>
  <div class="slide-enter-content">
    <ContentRenderer :value="home!" />

    <!-- Projects Section -->
    <section v-if="projects?.length" class="mt-16">
      <div class="mb-8 flex items-center justify-between">
        <ProseH2 class="m-0">
          Recent Projects
        </ProseH2>
        <NuxtLink
          to="/projects"
          class="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg text-white transition-colors duration-300"
        >
          <span>View All Projects</span>
          <div class="i-ph:arrow-right text-lg" />
        </NuxtLink>
      </div>
      <div class="not-prose grid grid-cols-1 gap-6 md:grid-cols-3">
        <ProjectItem
          v-for="project in projects"
          :key="project.id"
          :project="project"
          class="transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>
    </section>

    <!-- Articles Section -->
    <section v-if="articles?.length" class="slide-enter-content mt-16">
      <div class="mb-8 flex items-center justify-between">
        <ProseH2 class="m-0">
          Recent Articles
        </ProseH2>

        <NuxtLink
          to="/articles"
          class="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg text-white transition-colors duration-300"
        >
          <span>View All Articles</span>
          <div class="i-ph:arrow-right text-lg" />
        </NuxtLink>
      </div>
      <ArticleList :articles="articles" />
    </section>

    <!-- Talks Section -->
    <section v-if="talks?.length" class="mt-16">
      <div class="mb-8 flex items-center justify-between">
        <ProseH2 class="m-0">
          Recent Talks
        </ProseH2>

        <NuxtLink
          to="/talks"
          class="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors duration-300"
        >
          <span>View All Talks</span>
          <div class="i-ph:arrow-right text-lg" />
        </NuxtLink>
      </div>
      <div class="not-prose grid grid-cols-1 gap-6 md:grid-cols-3">
        <TalkItem
          v-for="talk in talks"
          :key="talk.id"
          :talk="talk"
          class="transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>
    </section>

    <!-- Get in Touch Section -->
    <section class="mb-32 mt-16">
      <ProseH2 class="mb-4">
        Get in Touch
      </ProseH2>
      <div class="max-w-none prose">
        <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
        <p>Feel free to reach out through any of these channels:</p>
        <div class="mt-6 flex flex-col gap-4 md:flex-row">
          <BaseButton
            to="mailto:me@josephanson.com"
            target="_blank"
            rel="noopener noreferrer"
            icon="i-ph:envelope-simple-duotone"
          >
            <span>me@josephanson.com</span>
          </BaseButton>
          <BaseButton
            to="https://linkedin.com/in/josephanson"
            target="_blank"
            rel="noopener noreferrer"
            icon="i-ph:linkedin-logo-duotone"
          >
            <span>LinkedIn Profile</span>
          </BaseButton>

          <BaseButton
            to="https://github.com/josephAnson"
            target="_blank"
            rel="noopener noreferrer"
            icon="i-ph:github-logo-duotone"
          >
            <span>GitHub Profile</span>
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>
