<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
})
</script>

<template>
  <BaseContainer class="relative z-10 text-sm md:text-base">
    <div class="max-w-none pb-30 prose">
      <ContentRenderer v-if="home" :value="home" />
      <div v-else>
        Home not found
      </div>
    </div>
  </BaseContainer>
</template>
