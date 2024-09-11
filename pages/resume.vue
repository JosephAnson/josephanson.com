<script setup lang="ts">
const contactInfo = [
  { icon: 'i-ph:map-pin-duotone', text: 'Amsterdam' },
  { icon: 'i-ph:phone-duotone', text: '+447902738455' },
  { icon: 'i-ph:linkedin-logo-duotone', text: 'linkedin.com/in/josephanson/', link: 'https://linkedin.com/in/josephanson/' },
  { icon: 'i-ph:globe-duotone', text: 'josephanson.com', link: 'https://josephanson.com' },
  { icon: 'i-ph:envelope-simple-duotone', text: 'me@josephanson.com', link: 'mailto:me@josephanson.com' },
]

const coreSkills: { title: string, tags: string[] }[] = [
  {
    title: 'Frontend Technologies',
    tags: ['Vue.js', 'Nuxt', 'React', 'TypeScript', 'JavaScript'],
  },
  {
    title: 'Backend Technologies',
    tags: ['Node.js', 'H3', 'RESTful APIs', 'GraphQL', 'Redis'],
  },
  {
    title: 'DevOps',
    tags: ['Docker', 'Azure', 'Serverless architecture'],
  },
  {
    title: 'Leadership',
    tags: ['Project Management', 'Mentoring', 'Technical Strategy'],
  },
  {
    title: 'Soft Skills',
    tags: ['Problem-solving', 'Communication', 'Adaptability'],
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
    position: 'Senior Frontend Developer',
    period: 'Mar 2023 - Present',
    description: 'At ABN AMRO, I blend technical leadership with hands-on development, focusing on delivering seamless user experiences and driving TypeScript adoption. My role encompasses leading frontend development for critical applications, mentoring developers, and ensuring accessibility compliance.',
    responsibilitiesTitle: 'Key Contributions',
    responsibilities: [
      'Leading the frontend development for the new loan application, focusing on delivering a seamless and accessible user experience.',
      'Serving as TypeScript Guild Lead, organising and conducting bi-weekly meetings to facilitate TypeScript adoption across the organisation. This involves creating learning materials, conducting bi-weekly TypeScript Guild meetings to mentor developers and ease the adoption of TypeScript.',
      'Implementing robust schema validation using TypeScript and Zod, which has been instrumental in improving form accuracy and data integrity',
      'Establishing a comprehensive testing framework with Vue Testing Library, Vitest, and Playwright, ensuring feature stability and accessibility compliance.',
      'Prioritised accessibility, making sure our applications are compliant with WCAG standards and accessible to all users.',
    ],
  },
  {
    company: 'Jumbo Supermarkten',
    position: 'Senior Frontend Developer',
    description: 'At Jumbo, I tackled diverse projects using cutting-edge technologies like Nuxt and Vue 3, contributing to key areas such as the Basket, Product List, Product Detail page, and Promotion pages. My work focused on enhancing user experience and implementing innovative features.',
    period: 'Mar 2022 - Mar 2023',
    responsibilitiesTitle: 'Notable Achievements',
    responsibilities: [
      'Upgrading the component library to support both Vue 2 and Vue 3 concurrently, utilising vue-demi and the Composition API for seamless integration.',
      'Revamping the Promotion pages, enhancing the website with a fresh and modern user experience.',
      'Implementing a new Dietary feature on the Product Detail page, enabling users to easily identify products that may trigger their allergies.',
    ],
  },
  {
    company: 'Passionate People - JavaScript Consultancy',
    position: 'Senior Frontend Consultant',
    description: 'As a Senior JavaScript Consultant at Passionate People, I collaborate with a diverse range of clients to deliver cutting-edge web solutions. My role combines technical expertise, strategic thinking, and leadership to drive successful project outcomes and foster team growth.',
    period: 'Feb 2022 - Present',
    responsibilitiesTitle: 'Key Responsibilities',
    responsibilities: [
      'Technical Leadership: Lead the architecture and development of complex web applications, leveraging Vue.js, Nuxt, and TypeScript. Ensure best practices in code quality, performance optimisation, and scalability across multiple client projects.',
      'Mentoring junior developers and collaborating with cross-functional teams, providing guidance on best practices in frontend development, code reviews, and problem-solving strategies.',
      'Client Collaboration: Work closely with clients to understand their unique requirements, provide technical recommendations, and translate business needs into effective technical solutions. Regularly present progress updates and technical insights to stakeholders.',
      'Organising and facilitating team-building events to strengthen team dynamics in a distributed work environment. These events focus on improving communication, fostering creativity, and building a strong, collaborative team culture despite physical distances.',
    ],
  },
  {
    company: 'Infigo',
    position: 'Remote Web Developer',
    period: '2015 - 2022',
    responsibilities: [
      'Developed a sophisticated InDesign plugin using Vue.js, Vuex, and TypeScript, enabling users to efficiently edit and export products directly within InDesign. This plugin streamlined the workflow for designers, significantly reducing the time required for product catalog creation and updates.',
      'Redesigned the customer-facing e-commerce platform, focusing on improving user experience through better architecture and faster load times. This involved implementing lazy loading techniques, optimising database queries, and refactoring the frontend to use modern JavaScript frameworks.',
      'Spearheaded the implementation of a Single Page Application (SPA) framework to replace the traditional MVC.NET routing system. This gradual migration from a .NET Razor application to a full Vue-based application improved performance, enhanced user experience, and simplified future development and maintenance.',
    ],
  },
  {
    company: 'Infigo',
    position: 'Freelance Web Developer',
    period: '2018 - 2022',
    description: 'As a freelance developer, I specialised in creating custom WordPress websites for small businesses, focusing on user-friendly designs and optimised performance.',
    responsibilitiesTitle: 'Key Services',
    responsibilities: [
      'Developed and maintained custom WordPress websites for a diverse range of small businesses, focusing on creating unique, brand-aligned designs that effectively showcased each client\'s products or services.',
      'Ensured high client satisfaction through personalized service, including one-on-one consultations, detailed project planning, and post-launch support and training to empower clients in managing their websites effectively.',
    ],
  },
]
</script>

<template>
  <NuxtLayout name="resume">
    <div class="min-h-screen bg-blue-50 p-10 text-blue-950">
      <header class="mb-4 justify-between md:flex">
        <div>
          <h1 class="mb-2 text-4xl">
            Joseph Lee Anson
          </h1>
          <h2 class="text-2xl text-blue-600">
            Senior Web Developer
          </h2>
        </div>
        <div class="grid gap-1 text-blue-950">
          <div v-for="(item, index) in contactInfo" :key="index">
            <div :class="item.icon" class="mr-2 h-5 w-5" />
            <NuxtLink v-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">
              {{ item.text }}
            </NuxtLink>
            <span v-else>{{ item.text }}</span>
          </div>
        </div>
      </header>
      <div class="grid gap-y-10">
        <section>
          <h2 class="heading">
            Summary
          </h2>
          <div class="section">
            <p>
              Senior Frontend Developer with over 8 years of experience in building and managing web applications using modern technologies like Vue.js, TypeScript, and Node.js. Expertise in leading teams, implementing technical innovations, and delivering high-quality, accessible web solutions. Strong focus on TypeScript adoption, accessibility standards, and improving user experience through clean, maintainable code.
            </p>
          </div>
        </section>

        <section>
          <h2 class="heading">
            Core Skills
          </h2>
          <div class="section">
            <ul class="list-disc list-inside">
              <li v-for="(item, idx) in coreSkills" :key="idx">
                <strong>{{ item.title }}</strong> {{ item.tags.join(', ') }}
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="heading">
            Work Experience
          </h2>
          <div class="section grid gap-10">
            <div v-for="(job, jobIndex) in experience" :key="jobIndex">
              <div class="mb-4 flex justify-between">
                <div>
                  <h3 class="subheading">
                    {{ job.position }}
                  </h3>
                  <p class="period">
                    {{ job.company }}
                  </p>
                </div>
                <p class="period">
                  {{ job.period }}
                </p>
              </div>
              <p v-if="job.description" class="mb-4">
                {{ job.description }}
              </p>
              <p v-if="job.responsibilitiesTitle" class="mb-4">
                {{ job.responsibilitiesTitle }}:
              </p>
              <ul class="grid list-disc list-inside gap-2">
                <li v-for="(responsibility, respIndex) in job.responsibilities" :key="respIndex" class="mb-2 last:mb-0">
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
            <div class="mb-2">
              <h3 class="subheading">
                Software Engineering
              </h3>
              <p class="period">
                University of South Wales
              </p>
            </div>
            <p class="period">
              2011-2015
            </p>
          </div>
        </section>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
.heading {
  --uno: mb-4 text-2xl font-semibold
}

.subheading {
  --uno: text-xl font-medium mb-1
}

.period {
  --uno: text-lg text-blue-400
}

.section {
  --uno: md\:pl-8
}
</style>
