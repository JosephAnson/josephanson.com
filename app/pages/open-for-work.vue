<script setup lang="ts">
// Configure SEO
const title = 'Open for Work in Madrid, Spain'
const description = 'Currently available for remote web development opportunities based in Madrid, Spain. Senior Web Developer specializing in Vue.js, React, and TypeScript with 8+ years of experience building scalable web applications.'

useHead({
  title: 'Open for Work | Joseph Anson',
  meta: [
    { name: 'description', content: 'Professional developer available for new opportunities' },
  ],
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
})

const { classes } = useTheme()

// Define key points about availability
const availabilityPoints = [
  'Currently available for remote positions',
  'Wishes to relocate to Madrid, Spain',
  'Open to full-time or contract opportunities',
  'Preferably roles using Vue.js, TypeScript, and modern frontend technologies',
  'Comfortable working with international teams across time zones',
]
</script>

<template>
  <div class="slide-enter-content pb-40">
    <ProseH1>Open for Work</ProseH1>

    <!-- Availability Banner -->
    <div class="my-8">
      <div class="flex items-center gap-3">
        <div class="h-3 w-3 animate-pulse rounded-full bg-green-500" />
        <p class="text-xl font-medium" :class="classes.highlight">
          Available for new opportunities
        </p>
      </div>

      <div class="mt-6">
        <p class="mb-6 text-lg">
          I'm currently seeking in-office, hybrid, or remote web development opportunities where I can work from
          <strong>Madrid, Spain</strong>. With my expertise in Vue.js, React, TypeScript, and modern web technologies,
          I'm ready to contribute to innovative projects and collaborate with forward-thinking teams.
        </p>

        <ProseH2>Availability Details</ProseH2>
        <ul class="grid mt-4 gap-2">
          <li v-for="(point, index) in availabilityPoints" :key="index" class="flex items-start gap-2">
            <div class="i-ph:check-circle-duotone mt-1 text-green-500" />
            <span>{{ point }}</span>
          </li>
        </ul>

        <div class="mt-10 flex flex-col gap-4 sm:flex-row">
          <BaseButton
            to="/resume"
            class="flex items-center justify-center gap-2 text-lg"
            icon="i-ph:read-cv-logo-duotone"
          >
            View My Resume
          </BaseButton>

          <BaseButton
            to="mailto:me@josephanson.com?subject=Work Opportunity"
            class="flex items-center justify-center gap-2 text-lg"
            icon="i-ph:envelope-duotone"
          >
            Contact Me
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Ideal Opportunity Section -->
    <section class="mb-20 mt-12">
      <ProseH2>My Ideal Opportunity</ProseH2>
      <div class="mt-8 w-full rounded-xl p-6" :class="classes.card">
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-3 mt-0 text-xl font-semibold" :class="classes.textLight">
              Technical Environment
            </h3>
            <p>I thrive in environments that embrace Vue.js/React, TypeScript, and modern frontend practices. I enjoy working with teams that value clean code, type safety, and thoughtful architecture.</p>
          </div>

          <div>
            <h3 class="mb-3 mt-0 text-xl font-semibold" :class="classes.textLight">
              Work Culture
            </h3>
            <p>I'm looking for a collaborative team that values continuous learning, knowledge sharing, and maintains a healthy work-life balance. I enjoy mentoring and contributing to team growth.</p>
          </div>

          <div>
            <h3 class="mb-3 mt-0 text-xl font-semibold" :class="classes.textLight">
              Project Types
            </h3>
            <p>I'm particularly interested in working on innovative web applications, SaaS products, or e-commerce platforms that solve meaningful problems and prioritize user experience.</p>
          </div>

          <div>
            <h3 class="mb-3 mt-0 text-xl font-semibold" :class="classes.textLight">
              Remote Collaboration
            </h3>
            <p>As a seasoned remote worker based in Madrid, I'm experienced with asynchronous communication, documentation, and maintaining productivity across different time zones.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
