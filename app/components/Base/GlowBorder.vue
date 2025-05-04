<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  borderRadius?: number
  color?: string | Array<string>
  borderWidth?: number
  duration?: number
  class?: string
  enabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  borderRadius: 4,
  color: '#FFF',
  borderWidth: 1,
  duration: 10,
  enabled: true,
})

const parentStyles = computed(() => {
  return { '--border-radius': `${props.borderRadius}px` }
})

const childStyles = computed(() => ({
  '--border-width': `${props.borderWidth}px`,
  '--border-radius': `${props.borderRadius}px`,
  '--glow-pulse-duration': `${props.duration}s`,
  '--mask-linear-gradient': `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
  '--background-radial-gradient': `radial-gradient(circle, transparent, ${
    Array.isArray(props.color) ? props.color.join(',') : props.color
  }, transparent)`,
}))
</script>

<template>
  <div
    :style="parentStyles"
    :class="
      cn(
        'relative grid w-fit place-items-center rounded glow-border',
        $props.class,
      )
    "
  >
    <div
      v-if="enabled"
      :style="childStyles"
      :class="
        cn(
          `glow-border pointer-events-none before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-[--border-radius] before:bg-[length:300%_300%] before:p-[--border-width] before:opacity-50 before:will-change-[background-position] before:content-['']`,
          'before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient]',
        )
      "
    />
    <slot />
  </div>
</template>

  <style scoped>
  .glow-border::before {
    animation: glow-pulse var(--glow-pulse-duration) infinite linear;
    background-image: var(--background-radial-gradient);
  }

  @keyframes glow-pulse {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  </style>
