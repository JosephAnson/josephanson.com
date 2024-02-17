<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/animations.css'

const { classes } = useTheme()

const htmlClasses = computed(() => {
  return `transition will-change-background ${classes.value.gradient} ${classes.value.text}`
})

useHead({
  title: appName,
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'view-transition',
      content: 'same-origin',
    },
  ],
  htmlAttrs: {
    class: 'flex flex-col h-100vh overflow-hidden',
  },
  bodyAttrs: {
    class: htmlClasses,
  },
})
</script>

<template>
  <div class="h-100vh of-y-auto scroll-smooth pb-20">
    <TheHeader />

    <main>
      <BaseContainer class="relative z-8 text-sm md:text-base">
        <NuxtPage />
      </BaseContainer>
    </main>

    <TheFooter />
  </div>
</template>
