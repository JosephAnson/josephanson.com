<script setup lang="ts">
const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
// @ts-expect-error mdc type issue
const generate = computed(() => props.id && headings?.anchorLinks?.h1)
</script>

<template>
  <h1 :id="id">
    <a
      v-if="generate"
      :href="`#${id}`"
    >
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>
