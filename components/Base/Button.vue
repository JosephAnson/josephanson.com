<script lang="ts" setup>
withDefaults(
  defineProps<{
    theme?: string
  }>(),
  {
    theme: 'secondary',
  },
)
</script>

<template>
  <button :class="`rounded bg-${theme}-500:20 px-4 py-2 transition-all`" aria-label="Navigation Menu">
    <slot />
  </button>
</template>
