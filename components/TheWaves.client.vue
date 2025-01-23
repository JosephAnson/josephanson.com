<script lang="ts" setup>
import { useWavesStore } from '~/stores/useWavesStore'

const props = defineProps<{
  amount?: number
  reverse?: boolean
}>()

const { classes } = useTheme()
const { state: waves, waveOptions } = useWavesStore()

// z-0 z-1 z-2 z-3 z-4 z-5 z-6 z-7 z-8 z-9 z-10

const { y } = useMouse()
const { height } = useWindowSize()
const mousePercent = computed(() => y.value / height.value / 10)

const totalWaves = computed(() => {
  return props.amount ? waves.value.slice(-props.amount) : waves.value
})

function reverseIndex(index: number) {
  const start = props.amount && !props.reverse ? waveOptions.value.layerCount - props.amount - 1 : 0
  return start + index
}

function opacity(index: number) {
  const steps = 1 / waveOptions.value.layerCount
  const reverse = reverseIndex(index)
  return (steps * (reverse - 1)) + (mousePercent.value + 0.2)
}
</script>

<template>
  <svg
    v-for="(wave, index) in totalWaves"
    v-bind="$attrs"
    :key="index"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${waveOptions.width} ${waveOptions.height}`"
    :class="`transition-all transform-gpu duration-1000 w-full z-${index} wave-fade-in ${reverse ? 'reverse' : ''}`"
  >
    <path
      class="transform-gpu ease-in-out"
      :class="`path-${reverseIndex(index)} ${classes.fill}`"
      :d="wave.d"
      :fill-opacity="opacity(index)"
      stroke="rgba(255,255,255,0.25)"
    />
  </svg>
</template>

<style scoped>
.wave-fade-in {
  opacity: 0;
  animation: fadeInUp 2s ease-in-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
  }
}

/* Add staggered delays for each wave */

.wave-fade-in.reverse:nth-child(9) { animation-delay: 0.3s; }
.wave-fade-in.reverse:nth-child(8) { animation-delay: 0.4s; }
.wave-fade-in.reverse:nth-child(7) { animation-delay: 0.5s; }
.wave-fade-in.reverse:nth-child(6) { animation-delay: 0.6s; }
.wave-fade-in.reverse:nth-child(5) { animation-delay: 0.7s; }
.wave-fade-in.reverse:nth-child(4) { animation-delay: 0.8s; }
.wave-fade-in.reverse:nth-child(3) { animation-delay: 0.9s; }
.wave-fade-in.reverse:nth-child(2) { animation-delay: 1s; }
.wave-fade-in.reverse:nth-child(1) { animation-delay: 1.1s; }
.wave-fade-in.reverse:nth-child(0) { animation-delay: 1.2s; }

.wave-fade-in:nth-child(3) { animation-delay: 0s; }
.wave-fade-in:nth-child(2) { animation-delay: 0.1s; }
.wave-fade-in:nth-child(1) { animation-delay: 0.2s; }
</style>
