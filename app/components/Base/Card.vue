<script setup lang="ts">
const { classes } = useTheme()
</script>

<template>
  <div :class="cn('p-6 rounded-xl transition-all !duration-300 hover:shadow-xl !hover:scale-[1.02]', classes.card, $attrs.class as string)">
    <slot />
  </div>
</template>
