<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  talks: Collections['talks'][]
}>()
</script>

<template>
  <div v-if="talks?.length" class="not-prose slide-enter-content grid gap-6">
    <TalkItem
      v-for="talk in talks"
      :key="talk.id"
      :talk="talk"
    />
  </div>
</template>
