<script setup lang="ts">
const props = defineProps<{
  tags: string[]
}>()

const { classes } = useTheme()
</script>

<template>
  <div class="flex items-center gap-x-4 text-xs">
    <span
      v-for="tag in props.tags"
      :key="tag"
      :class="classes.tag"
    >
      {{ tag }}
    </span>
  </div>
</template>
