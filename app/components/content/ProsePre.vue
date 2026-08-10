<script setup lang="ts">
const props = withDefaults(defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>(), {
  code: '',
  language: null,
  filename: null,
  highlights: () => [],
  meta: null,
  class: null,
})
</script>

<template>
  <pre
    :class="props.class"
    tabindex="0"
    :aria-label="`Scrollable code block${filename ? `: ${filename}` : ''}`"
  ><slot /></pre>
</template>

<style>
pre code .line {
  display: block;
}
</style>
