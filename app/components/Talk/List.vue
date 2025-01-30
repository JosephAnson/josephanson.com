<script setup lang="ts">
import type { Collections } from '@nuxt/content';

defineProps<{
  talks: Collections['talks'][]
}>()

</script>

<template>
  <div class="not-prose pb-16">
    <ul v-if="talks?.length" class="not-prose slide-enter-content mt-8 block space-y-8">
      <TalkItem
        v-for="talk in talks"
        :key="talk.id"
        :talk="talk"
      />
    </ul>
  </div>
</template>
