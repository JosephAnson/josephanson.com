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
  <component :is="as" class="max-w-7xl container">
    <slot />
  </component>
</template>
