<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

const socials: Record<string, NuxtLinkProps & { label: string }> = {
  github: {
    label: 'Github',
    href: 'https://github.com/josephAnson',
    target: '_blank',
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/josephanson/',
    target: '_blank',
  },
  email: {
    label: 'Email me',
    href: 'mailto:me@josephanson.com?Subject=Hello from josephanson.com',
    target: '_blank',
  },
}

const socialsMap = {
  twitter: 'i-ph:twitter-logo-duotone',
  facebook: 'i-ph:facebook-logo-duotone',
  instagram: 'i-ph:instagram-logo-duotone',
  youtube: 'i-ph:youtube-logo-duotone',
  github: 'i-ph:github-logo-duotone',
  medium: 'i-ph:medium-logo-duotone',
  linkedin: 'i-ph:linkedin-logo-duotone',
  email: 'i-ph:envelope-duotone',
}

const icons = computed<any>(() => {
  return Object.entries(socials)
    .map(([key, value]) => {
      return {
        icon: socialsMap[key as keyof typeof socialsMap],
        ...value,
      }
    })
    .filter(Boolean)
})

function getRel(icon: any) {
  const base = ['noopener', 'noreferrer']
  if (icon.rel)
    base.push(icon.rel)

  return base.join(' ')
}
</script>

<template>
  <div class="social-links">
    <!-- eslint-disable-next-line vue/no-multiple-template-root -->
    <NuxtLink
      v-for="icon in icons"
      :key="icon.label"
      :rel="getRel(icon)"
      :title="icon.label"
      :aria-label="icon.label"
      :href="icon.href"
      :target="icon.target"
      class="social-link"
    >
      <div v-if="icon.icon" :class="icon.icon" class="h-5 w-5" />
    </NuxtLink>
  </div>
</template>
