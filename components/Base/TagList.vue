<script setup lang="ts">
const props = defineProps<{
  tags: string[]
}>()

const { classes } = useTheme()
</script>

<template>
  <div class="flex flex-wrap items-center gap-1 text-xs md:gap-x-2">
    <span
      v-for="tag in props.tags"
      :key="tag"
      :class="classes.tag"
    >
      {{ tag }}
    </span>
  </div>
</template>
