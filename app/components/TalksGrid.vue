<script setup lang="ts">
const { data: talks } = await useAsyncData('talks', () => 
  queryCollection('talks')
    .sort({ date: -1 })
    .limit(3)
    .find()
)
</script>

<template>
  <section class="my-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TalkItem
        v-for="talk in talks"
        :key="talk._id"
        :article="talk"
        class="hover:scale-[1.02] transition-transform duration-300"
      />
    </div>
    <div class="mt-8 text-center">
      <NuxtLink
        to="/talks"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-300"
      >
        <span>View All Talks</span>
        <div class="i-ph:arrow-right text-lg" />
      </NuxtLink>
    </div>
  </section>
</template> 