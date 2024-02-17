<script setup lang="ts">
const { classes } = useTheme()
</script>

<template>
  <code :class="classes.highlight"><slot /></code>
</template>
