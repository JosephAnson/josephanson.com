<script setup lang="ts">
const props = defineProps<{
  tags: string[]
}>()

const currentTheme = useCurrentTheme()
</script>

<template>
  <div class="flex items-center gap-x-4 text-xs">
    <span
      v-for="tag in props.tags"
      :key="tag"
      :class="`relative z-10 rounded-full bg-${currentTheme}-50 px-3 py-1.5 text-${currentTheme}-800 dark:text-${currentTheme}-800 font-medium`"
    >
      {{ tag }}
    </span>
  </div>
</template>
