<script setup lang="ts">
const currentTheme = useCurrentTheme()
</script>

<template>
  <code :class="`text-${currentTheme}-600 dark:text-${currentTheme}-400`"><slot /></code>
</template>
