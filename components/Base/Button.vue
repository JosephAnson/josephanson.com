<script lang="ts" setup>
withDefaults(
  defineProps<{
    theme?: 'primary' | 'secondary'
  }>(),
  {
    theme: 'secondary',
  },
)

// bg-primary-500:20 bg-secondary-500:20
</script>

<template>
  <button :class="`rounded bg-${theme}-500:20 px-4 py-2 transition-all`" aria-label="Navigation Menu">
    <slot />
  </button>
</template>
