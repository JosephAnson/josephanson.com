<script lang="ts" setup>
import { waveInit } from '~/utils/wave'

const props = defineProps<{
  amount?: number
  reverse?: boolean
}>()

const { classes } = useTheme()
const { y } = useMouse()
const { width, height } = useWindowSize()

// Hardcoded wave options - only width is dynamic for responsiveness
const waveOptions = computed(() => ({
  height: 480,
  width: width.value,
  segmentCount: 12,
  layerCount: 10,
  variance: 1.2,
}))

// Generate waves
const waves = computed(() => waveInit(waveOptions.value))
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

function getWaveVariables(waveIndex: number) {
  const wave = waves.value[waveIndex]
  if (!wave)
    return {}

  const maxSteps = 10
  const variables: Record<string, string> = {
    '--wave-path-start': `"${wave.d}"`,
    '--wave-duration': `${35 - waveIndex}s`,
  }

  // Set variables for each animated path
  for (let i = 0; i < maxSteps; i++) {
    const pathValue = i < wave.animatedPath.length
      ? wave.animatedPath[i]
      : wave.d // Fall back to base path if this wave has fewer steps
    variables[`--wave-path-${i}`] = `"${pathValue}"`
  }

  return variables
}

function getPathStyle(index: number) {
  const waveIndex = reverseIndex(index)
  const variables = getWaveVariables(waveIndex)

  // Convert variables object to CSS style string
  const styleEntries = Object.entries(variables).map(([key, value]) => `${key}: ${value}`)
  return styleEntries.join('; ')
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
      class="wave-path transform-gpu ease-in-out"
      :class="classes.fill"
      :d="wave.d"
      :fill-opacity="opacity(index)"
      :style="getPathStyle(index)"
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

@keyframes wave-morph {
  0% {
    d: path(var(--wave-path-start));
  }
  10% {
    d: path(var(--wave-path-1));
  }
  20% {
    d: path(var(--wave-path-2));
  }
  30% {
    d: path(var(--wave-path-3));
  }
  40% {
    d: path(var(--wave-path-4));
  }
  50% {
    d: path(var(--wave-path-5));
  }
  60% {
    d: path(var(--wave-path-6));
  }
  70% {
    d: path(var(--wave-path-7));
  }
  80% {
    d: path(var(--wave-path-8));
  }
  90% {
    d: path(var(--wave-path-9));
  }
  100% {
    d: path(var(--wave-path-start));
  }
}

.wave-path {
  animation: wave-morph var(--wave-duration) ease-in-out infinite;
}
</style>
