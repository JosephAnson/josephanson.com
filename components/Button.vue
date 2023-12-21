<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'submit',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded-md bg-gray-900 px-4 py-2 text-sm text-gray-100 font-medium leading-snug disabled:cursor-not-allowed dark:bg-gray-100 md:px-6 md:py-3 md:text-base dark:text-gray-900 md:leading-normal"
  >
    <slot />
  </button>
</template>
