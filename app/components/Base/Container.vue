<script setup lang="ts">
import type { PropType } from 'vue'

type HTMLElementsTags = keyof HTMLElementTagNameMap

defineProps({
  as: {
    type: String as PropType<HTMLElementsTags>,
    required: false,
    default: 'div',
  },
})
</script>

<template>
  <component :is="as" class="container max-w-[112rem] w-full px-5 2xl:px-16 lg:px-12 sm:px-8">
    <slot />
  </component>
</template>
