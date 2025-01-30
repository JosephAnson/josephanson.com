<script setup lang="ts">
const { data: talks } = await useAsyncData(() => queryCollection('talks').all())

useSeoMeta({
  title: 'My Talks',
  description: 'Explore a curated selection of talks that I have given.',
})
</script>

<template>
  <BaseContainer class="relative z-10 text-sm md:text-base">
    <div class="max-w-none pb-30 prose">
      <ProseH1>My Talks</ProseH1>

      <TalkList v-if="talks" :talks="talks" />
    </div>
  </BaseContainer>
</template>
