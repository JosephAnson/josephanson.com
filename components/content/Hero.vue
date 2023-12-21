<script setup lang="ts">
defineProps({
  image: {
    type: String,
    default: null,
  },
  imageAlt: {
    type: String,
    default: 'Hero Image',
  },
  imagePosition: {
    type: String,
    default: 'right',
  },
})
</script>

<template>
  <section class="hero grid gap-8 lg:grid-cols-2">
    <div class="layout">
      <div class="content">
        <div class="title text-4xl font-bold">
          <ContentSlot :use="$slots.title" unwrap="p">
            Hero title
          </ContentSlot>
        </div>
        <div class="description mt-3 text-xl">
          <ContentSlot :use="$slots.description" unwrap="p">
            Hero description
          </ContentSlot>
        </div>
      </div>
      <NuxtImg
        v-if="image"
        :class="imagePosition"
        :src="image"
        :alt="imageAlt"
        :width="16"
        :height="9"
        class="aspect-[16/9] w-full rounded-md object-cover"
      />
    </div>
  </section>
</template>
