<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)
const title = computed(() => isNotFound.value ? 'Nothing lives here.' : 'Something didn’t load.')
const description = computed(() => isNotFound.value
  ? 'The page may have moved, or the address may be incomplete.'
  : 'The site hit an unexpected problem. Try the page again, or return home.')

useSeoMeta({
  title: () => `${props.error.statusCode} · ${title.value}`,
  description: () => description.value,
})

function retry() {
  window.location.reload()
}
</script>

<template>
  <div class="site-root error-page min-h-dvh">
    <a href="#main-content" class="site-skip-link">Skip to content</a>
    <TheHeader />
    <main id="main-content" tabindex="-1">
      <BaseContainer>
        <section class="error-surface" aria-labelledby="error-title">
          <p class="error-code">
            {{ props.error.statusCode }}
          </p>
          <h1 id="error-title" class="error-title">
            {{ title }}
          </h1>
          <p class="error-description">
            {{ description }}
          </p>
          <div class="error-actions">
            <button v-if="!isNotFound" type="button" class="site-button error-action" @click="retry">
              Try again
            </button>
            <NuxtLink to="/" class="site-button error-action" @click="clearError({ redirect: '/' })">
              Back home
            </NuxtLink>
          </div>
        </section>
      </BaseContainer>
    </main>
    <TheFooter />
  </div>
</template>
