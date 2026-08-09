<script setup lang="ts">
const props = withDefaults(defineProps<{
  kind: 'empty' | 'error'
  title: string
  description: string
  actionLabel?: string
  busy?: boolean
  headingLevel?: 'h1' | 'h2' | 'h3'
}>(), {
  actionLabel: undefined,
  busy: false,
  headingLevel: 'h2',
})

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <section
    class="collection-state"
    :class="`is-${props.kind}`"
    :role="props.kind === 'error' ? 'alert' : 'status'"
    :aria-busy="props.busy"
  >
    <component :is="props.headingLevel" class="collection-state-title">
      {{ props.title }}
    </component>
    <p class="collection-state-description">
      {{ props.description }}
    </p>
    <button
      v-if="props.actionLabel"
      type="button"
      class="site-button collection-state-action"
      :disabled="props.busy"
      @click="emit('action')"
    >
      {{ props.busy ? 'Trying again…' : props.actionLabel }}
    </button>
  </section>
</template>
