<script setup lang="ts">
const title = 'Senior Web Developer Resume'
const description = 'Experienced Senior Web Developer with 8+ years of expertise in building scalable web applications using Vue.js, React, and TypeScript. Proficient in containerized deployments and modern web technologies. Passionate about open-source and cloud-native development. Download Resume.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
})

definePageMeta({
  layout: 'plain',
  documentDriven: {
    page: false, // Keep page fetching enabled
    surround: false, // Disable surround fetching
  },
})

const { classes } = useTheme()

const contactInfo = [
  { icon: 'i-ph:map-pin-duotone', text: 'Madrid,Spain', link: 'https://maps.app.goo.gl/M7PLvUNrsVhQPcYKA' },
  { icon: 'i-ph:phone-duotone', text: '+447902738455', link: 'tel:+447902738455' },
  { icon: 'i-ph:linkedin-logo-duotone', text: 'linkedin.com/in/josephanson/', link: 'https://linkedin.com/in/josephanson/' },
  { icon: 'i-ph:globe-duotone', text: 'josephanson.com', link: 'https://josephanson.com' },
  { icon: 'i-ph:envelope-simple-duotone', text: 'me@josephanson.com', link: 'mailto:me@josephanson.com' },
]

const coreSkills: { title: string, tags: string[] }[] = [
  {
    title: 'Frontend Technologies',
    tags: ['Vue.js (v2 & v3)', 'Nuxt.js', 'React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
  },
  {
    title: 'Testing & Quality Assurance',
    tags: ['Vitest', 'Vue Testing Library', 'Playwright', 'End-to-End Testing', 'Unit Testing'],
  },
  {
    title: 'Cloud & Infrastructure',
    tags: ['Docker', 'Kubernetes Basics', 'CI/CD Pipelines', 'Serverless Architecture'],
  },
  {
    title: 'Backend Technologies',
    tags: ['Node.js (Express, H3, Nitro)', 'RESTful APIs', 'GraphQL', 'Redis'],
  },
  {
    title: 'Software Engineering Practices',
    tags: ['Micro-frontends', 'Domain-Driven Design', 'Code Reviews', 'Agile Methodologies'],
  },
  {
    title: 'Leadership & Collaboration',
    tags: ['Mentoring', 'Stakeholder Communication', 'TypeScript Advocacy', 'Team Leadership'],
  },
]

const experience: {
  company: string
  description?: string
  position: string
  period: string
  responsibilitiesTitle?: string
  responsibilities: string[]
}[] = [
  {
    company: 'ABN AMRO Bank N.V.',
    position: 'Lead Frontend Developer',
    period: 'Mar 2023 - Present',
    description: 'Technical lead for frontend development at one of the largest Dutch banks, driving TypeScript adoption and accessibility compliance across enterprise-level financial applications.',
    responsibilitiesTitle: 'Key Contributions',
    responsibilities: [
      'Led the successful launch of a new Loan Application platform, implementing modern frontend architecture with Vue 3 and TypeScript, resulting in a 4% increase in loan application conversions',
      'Spearheaded the migration of legacy JavaScript codebases to TypeScript, implementing advanced type safety patterns and reducing runtime errors',
      'Designed and implemented a comprehensive accessibility first testing strategy using Vitest, Vue Testing Library, and Playwright',
      'Led feature development by breaking down complex requirements into manageable components and creating detailed implementation plans',
      'Mentored a team of 4 developers through regular code reviews and technical workshops to improve code quality and team productivity',
      'Collaborated with UX designers to implement accessible components following design system patterns',
      'Implemented containerised deployment strategies using Docker for frontend applications',
    ],
  },
  {
    company: 'Jumbo Supermarkten',
    position: 'Senior Frontend Developer',
    description: 'Key contributor to the development of one of the largest e-commerce platforms in the Netherlands, focusing on performance optimization and modern web technologies.',
    period: 'Mar 2022 - Mar 2023',
    responsibilitiesTitle: 'Technical Achievements',
    responsibilities: [
      'Led the development of a bi-directional Vue 2/Vue 3 component library using vue-demi and Composition API, enabling seamless migration to Vue 3',
      'Optimized critical user flows (product search, basket management) resulting in faster page load times',
      'Implemented a real-time dietary preferences system, enhancing the product detail page experience for millions of users',
      'Introduced modern state management patterns using Pinia, reducing code complexity and improving maintainability of complex features',
      'Collaborated with UX designers to implement responsive and accessible components',
    ],
  },
  {
    company: 'Passionate People - JavaScript Consultancy',
    position: 'Senior Frontend Consultant',
    description: 'Technical consultant specialising in Vue.js and TypeScript, delivering high-quality solutions for enterprise clients across various industries.',
    period: 'Feb 2022 - Present',
    responsibilitiesTitle: 'Key Contributions',
    responsibilities: [
      'Led the architecture and development of complex web applications, leveraging Vue.js, Nuxt, and TypeScript. Ensured best practices in code quality, performance optimisation, and scalability across multiple client projects.',
      'Mentored junior developers and collaborated with cross-functional teams, providing guidance on best practices in frontend development, code reviews, and problem-solving strategies.',
      'Worked closely with clients to understand their requirements, provided technical recommendations, and translated business needs into effective technical solutions. Regularly presented progress updates and technical insights to stakeholders.',
      'Organised and facilitated team-building events to strengthen team dynamics in a distributed work environment. These events focused on improving communication, fostering creativity, and building a strong, collaborative team culture despite physical distances.',
    ],
  },
  {
    company: 'Infigo',
    position: 'Remote Web Developer',
    period: '2015 - 2022',
    responsibilities: [
      'Developed a sophisticated InDesign plugin using Vue.js, Vuex, and TypeScript, enabling users to efficiently edit and export products directly within InDesign. This plugin streamlined the workflow for designers, significantly reducing the time required for product catalog creation and updates.',
      'Redesigned the customer-facing e-commerce platform, focusing on improving user experience. This involved refactoring the frontend to use Vue. This gradual migration from a .NET Razor application to a full Vue-based application improved performance, enhanced user experience, and simplified future development and maintenance.',
    ],
  },
]

const { status, execute, data, error } = useFetch<Blob>('/download-resume', { immediate: false })

async function onPrint() {
  await execute()

  if (!error.value && data.value) {
    const url = URL.createObjectURL(data.value)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Joseph Anson - Resume.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}
</script>

<template>
  <NuxtLayout name="plain">
    <teleport to="#teleport-menu">
      <BaseButton class="flex items-center gap-2" :disabled="status === 'pending'" @click="onPrint">
        <span class="hidden md:inline">Download</span>
        <span class="i-ph:file-pdf-duotone h-6 w-6 text-lg" :class="{ 'i-ph:spinner-gap-duotone animate-spin': status === 'pending' }" />
      </BaseButton>
    </teleport>
    <div class="print:backdrop-none relative z-10 mx-auto mb-50 max-w-[950px] border-black/20 text-sm backdrop-blur print:mb-0 print:max-w-none md:border-1 print:border-0 dark:border-white/20 md:text-base print:text-[17px]/6 print:text-black">
      <div class="slide-enter-content origin-top-left p-6 py-10 md:p-10 print:p-0">
        <header class="mb-8 justify-between gap-2 md:mb-4 print:mb-4 md:flex print:flex">
          <div class="mb-3 md:mb-0 print:mb-0">
            <h1 class="mb-3 text-3xl font-medium md:text-5xl print:text-5xl">
              Joseph Lee Anson
            </h1>
            <h2 class="text-xl md:text-2xl print:text-2xl" :class="classes.highlight">
              Senior Web Developer
            </h2>
          </div>
          <div class="grid gap-1">
            <div v-for="(item, index) in contactInfo" :key="index">
              <div :class="item.icon" class="mr-2 h-5 w-5" />
              <a v-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer" :class="classes.highlight">
                {{ item.text }}
              </a>
              <span v-else>{{ item.text }}</span>
            </div>
          </div>
        </header>
        <div class="slide-enter-content grid gap-y-5 print:gap-y-4">
          <section>
            <h2 class="heading">
              Summary
            </h2>
            <div class="section">
              <p>
                Senior Frontend Developer with 8+ years of experience in building scalable, maintainable web applications using Vue.js, React, and TypeScript. Proven track record of leading technical initiatives, improving development processes, and delivering high-quality solutions. Experienced in containerized deployments and modern web technologies. Passionate about open-source, clean code, type safety, and mentoring developers to achieve technical excellence.
              </p>
            </div>
          </section>

          <section>
            <h2 class="heading">
              Core Skills
            </h2>
            <div class="section">
              <ul class="list-inside md:list-disc print:list-disc">
                <li v-for="(item, idx) in coreSkills" :key="idx" class="mb-4 md:mb-3 print:mb-3">
                  <strong class="mb-1 mr-1 inline-block md:mb-0 print:mb-0">{{ item.title }}:</strong>
                  {{ item.tags.join(', ') }}
                </li>
              </ul>
            </div>
          </section>

          <section class="block">
            <h2 class="heading">
              Work Experience
            </h2>
            <div class="section grid gap-6">
              <div v-for="(job, jobIndex) in experience" :key="jobIndex" class="break-inside-avoid">
                <div class="mb-3 justify-between md:flex print:flex">
                  <div>
                    <h3 class="subheading">
                      {{ job.position }}
                    </h3>
                    <p class="md:text-lg print:text-lg" :class="classes.highlight">
                      {{ job.company }}
                    </p>
                  </div>
                  <p class="md:text-lg print:text-lg" :class="classes.highlight">
                    {{ job.period }}
                  </p>
                </div>
                <p v-if="job.description" class="mb-3">
                  {{ job.description }}
                </p>
                <p v-if="job.responsibilitiesTitle" class="mb-3">
                  {{ job.responsibilitiesTitle }}:
                </p>
                <ul class="grid list-disc list-inside gap-2">
                  <li
                    v-for="(responsibility, respIndex) in job.responsibilities" :key="respIndex"
                    class="list-disc list-inside break-inside-avoid last:mb-0"
                  >
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 class="heading">
              Education
            </h2>
            <div class="section flex justify-between">
              <div>
                <h3 class="subheading">
                  Software Engineering
                </h3>
                <p class="md:text-lg print:text-lg" :class="classes.highlight">
                  University of South Wales
                </p>
              </div>
              <p class="pt-1 md:pt-0 print:pt-0 md:text-lg print:text-lg" :class="classes.highlight">
                2011 - 2015
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
.heading {
  --uno: mb-3 text-2xl font-semibold
}

.subheading {
  --uno: text-xl font-medium
}

.section {
  --uno: md\:pl-8 print\:pl-8
}
</style>
