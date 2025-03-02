<script setup lang="ts">
const { data: home } = await useAsyncData('home', () => queryCollection('content').path('/').first())
const { data: talks } = await useAsyncData('home-talks', () => queryCollection('talks').limit(3).order('date', 'DESC').all())
const { data: projects } = await useAsyncData('home-projects', () => queryCollection('projects').limit(3).order('date', 'DESC').all())
const { data: articles } = await useAsyncData('home-articles', () => queryCollection('articles').limit(3).order('date', 'DESC').all())
const { classes } = useTheme()

useSeoMeta({
  title: home.value?.seo?.title,
  description: home.value?.seo?.description,
})
</script>

<template>
  <div class="slide-enter-content">
    <div class="slide-enter-content grid grid-cols-1 gap-6 lg:grid-cols-2 md:gap-20">
      <div>
        <ProseH1 class="mb-8 mt-4 text-5xl md:mt-0 md:text-6xl">
          Hi <BaseLineShadowText>there!</BaseLineShadowText>
        </ProseH1>

        <ProseH2 class="mt-0 text-3xl leading-tight">
          I'm a seasoned <span class="rounded bg-white px-2" :class="classes.textTint">Frontend</span> expert with <YearsSince /> years of experience crafting innovative web applications.
        </ProseH2>
      </div>

      <div class="">
        <ProseH2 class="m-0 mb-8">
          Recent Highlight
        </ProseH2>

        <div class="not-prose">
          <NuxtLink :to="talks?.[0]?.path || talks?.[0]?.url">
            <!-- Features Content -->
            <BaseCard
              v-if="talks?.[0]"
              :image="{ src: talks?.[0].image, alt: talks?.[0].title }"
              image-classes="md:aspect-[18/6]"
            >
              <div class="h-full flex flex-col">
                <h2 class="mb-4 text-xl font-bold group-hover:underline">
                  {{ talks?.[0].title }}
                </h2>

                <div class="flex flex-wrap justify-between gap-4" :class="classes.textLight">
                  <div class="flex flex-wrap gap-4">
                    <div class="flex items-center gap-2 text-xs">
                      <span class="i-ph:calendar-star-duotone" />
                      <span>{{ talks?.[0].event }}</span>
                    </div>

                    <div class="flex items-center gap-2 text-xs">
                      <span class="i-ph:map-pin-duotone" />
                      <span>{{ talks?.[0].location }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </BaseCard>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Projects Section -->
    <section v-if="projects?.length" class="mt-16">
      <div class="slide-enter-content mb-8 flex items-center justify-between">
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
      <ProjectList :projects="projects" />
    </section>

    <!-- Articles Section -->
    <section v-if="articles?.length" class="slide-enter-content mt-16">
      <div class="slide-enter-content mb-8 flex items-center justify-between">
        <ProseH2 class="m-0">
          Recent Articles
        </ProseH2>

        <NuxtLink
          to="/articles"
          class="bg-primary-500 hover:bg-primary-600 flex items-center gap-2 rounded-lg text-white transition-colors duration-300"
        >
          <span>View All Articles</span>
          <div class="i-ph:arrow-right text-lg" />
        </NuxtLink>
      </div>
      <ArticleList :articles="articles" class="slide-enter-content" />
    </section>

    <!-- Talks Section -->
    <section v-if="talks?.length" class="mb-32 mt-16">
      <div class="mb-8 flex items-center justify-between">
        <ProseH2 class="m-0">
          Recent Talks
        </ProseH2>

        <NuxtLink
          to="/talks"
          class="bg-primary-500 hover:bg-primary-600 flex items-center gap-2 rounded-lg text-white transition-colors duration-300"
        >
          <span>View All Talks</span>
          <div class="i-ph:arrow-right text-lg" />
        </NuxtLink>
      </div>

      <TalkList :talks="talks" class="slide-enter-content" />
    </section>
  </div>
</template>
