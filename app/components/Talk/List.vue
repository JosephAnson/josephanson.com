<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  talks: Collections['talks'][]
}>()
</script>

<template>
  <ul v-if="talks?.length" class="not-prose slide-enter-content grid grid-cols-1 gap-6 md:grid-cols-3">
    <li v-for="talk in talks" :key="talk.id">
      <TalkItem :talk="talk" />
    </li>
  </ul>
</template>
