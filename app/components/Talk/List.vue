<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  talks: Collections['talks'][]
}>()
</script>

<template>
  <ul v-if="talks?.length" class="talk-list">
    <li v-for="talk in talks" :key="talk.id">
      <TalkItem :talk="talk" />
    </li>
  </ul>
</template>
