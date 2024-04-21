<script lang="ts" setup>
import { useWavesStore } from '~/stores/useWavesStore'

const props = defineProps<{
  amount?: number
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
  const start = props.amount ? waveOptions.value.layerCount - props.amount - 1 : 0
  return start + index
}

function opacity(index: number) {
  const steps = 1 / waveOptions.value.layerCount
  const reverse = reverseIndex(index)
  return (steps * (reverse - 1)) + mousePercent.value
}
</script>

<template>
  <svg
    v-for="(wave, index) in totalWaves"
    v-bind="$attrs"
    :key="index"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${waveOptions.width} ${waveOptions.height}`"
    :class="`transition-all transform-gpu duration-1000 w-full z-${index}`"
  >
    <path
      class="transform-gpu transition transition-all ease-in-out"
      :class="`path-${reverseIndex(index)} ${classes.fill}`"
      :d="wave.d"
      :fill-opacity="opacity(index)"
      stroke="rgba(255,255,255,0.25)"
    />
  </svg>
</template>
