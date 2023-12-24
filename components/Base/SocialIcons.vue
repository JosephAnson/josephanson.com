<script setup lang="ts">
const socials = {
  twitter: 'https://twitter.com/josephleeanson',
  instagram: 'https://www.instagram.com/joe.anson',
  github: 'https://github.com/josephAnson',
}

const socialsMap = {
  twitter: 'i-ph:twitter-logo-duotone',
  facebook: 'i-ph:facebook-logo-duotone',
  instagram: 'i-ph:instagram-logo-duotone',
  youtube: 'i-ph:youtube-logo-duotone',
  github: 'i-ph:github-logo-duotone',
  medium: 'i-ph:medium-logo-duotone',
}

const icons = computed<any>(() => {
  return Object.entries(socials)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return value
      }
      else {
        return {
          href: value,
          icon: socialsMap[key as keyof typeof socialsMap],
          label: value,
        }
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
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <NuxtLink
    v-for="icon in icons"
    :key="icon.label"
    :rel="getRel(icon)"
    :title="icon.label"
    :aria-label="icon.label"
    :href="icon.href"
    target="_blank"
    class="h-6 w-6 flex hover:text-primary-500"
  >
    <div v-if="icon.icon" :class="icon.icon" class="h-full w-full" />
  </NuxtLink>
</template>
