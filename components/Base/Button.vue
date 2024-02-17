<script lang="ts" setup>
const { classes } = useTheme()
</script>

<template>
  <button :class="classes.button" aria-label="Navigation Menu">
    <slot />
  </button>
</template>
