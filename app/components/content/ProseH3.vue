<script setup lang="ts">
const props = defineProps<{
  id?: string
}>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && (
  headings?.anchorLinks === true
  || (typeof headings?.anchorLinks === 'object' && headings.anchorLinks?.h3)
))
</script>

<template>
  <h3 :id="props.id">
    <a v-if="props.id && generate" :href="`#${props.id}`" class="prose-heading-link">
      <slot />
      <span class="prose-heading-permalink" aria-hidden="true" />
      <span class="site-visually-hidden">Permalink to this section</span>
    </a>
    <slot v-else />
  </h3>
</template>
