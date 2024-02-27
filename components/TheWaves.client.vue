<script lang="ts" setup>
import { useWavesStore } from '~/stores/useWavesStore'

const { classes } = useTheme()

const { state: waves, waveOptions } = useWavesStore()

// z-0 z-1 z-2 z-3 z-4 z-5 z-6 z-7 z-8 z-9 z-10

const { y } = useMouse()
const { height } = useWindowSize()
const mousePercent = computed(() => y.value / height.value / 10)
</script>

<template>
  <svg
    v-for="(wave, index) in waves"
    :key="index" xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${waveOptions.width} ${waveOptions.height}`"
    :class="`fixed left-0 pointer-events-none bottom-0 z-${index}`"
  >
    <path
      class="transition"
      :class="`will-change-contents path-${index} ${classes.fill}`"
      :d="wave.d"
      :fill-opacity="(1 / waveOptions.layerCount) * (index + 1) + mousePercent"
      stroke="rgba(255,255,255,0.25)"
    />
  </svg>
</template>

<style>

</style>
