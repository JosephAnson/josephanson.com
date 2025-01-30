<script setup lang="ts">
const { data: talks } = await useAsyncData('talks', () => queryCollection('talks').all())
</script>

<template>
  <section class="my-12">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <TalkItem
        v-for="talk in talks"
        :key="talk.id"
        :talk="talk"
        class="transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
    <div class="mt-8 text-center">
      <NuxtLink
        to="/talks"
        class="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors duration-300"
      >
        <span>View All Talks</span>
        <div class="i-ph:arrow-right text-lg" />
      </NuxtLink>
    </div>
  </section>
</template>
