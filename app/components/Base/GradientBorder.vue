<script lang="ts" setup>
interface GradientButtonProps {
  borderWidth?: number
  colors?: string[]
  duration?: number
  borderRadius?: number
  blur?: number
  class?: string
  bgColor?: string
}

const props = withDefaults(defineProps<GradientButtonProps>(), {
  colors: () => [
    '#FF0000',
    '#FFA500',
    '#FFFF00',
    '#008000',
    '#0000FF',
    '#4B0082',
    '#EE82EE',
    '#FF0000',
  ],
  duration: 2500,
  borderWidth: 2,
  borderRadius: 8,
  blur: 4,
  bgColor: '#000',
})

const durationInMilliseconds = computed(() => `${props.duration}ms`)
const allColors = computed(() => props.colors.join(', '))
const borderWidthInPx = computed(() => `${props.borderWidth}px`)
const blurPx = computed(() => `${props.blur}px`)
</script>

<template>
  <div
    :class="
      cn(
        'relative flex items-center justify-center min-w-28 min-h-10 overflow-hidden before:absolute before:-inset-[200%] rounded animate-rainbow rainbow-btn',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<style scoped>
.animate-rainbow::before {
  content: "";
  background: conic-gradient(v-bind(allColors));
  animation: rotate-rainbow v-bind(durationInMilliseconds) linear infinite;
  filter: blur(v-bind(blurPx));
  padding: v-bind(borderWidthInPx);
  z-index: -1;
  pointer-events: none;
}

.rainbow-btn {
  padding: v-bind(borderWidthInPx);
}

@keyframes rotate-rainbow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
