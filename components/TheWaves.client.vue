<script lang="ts" setup>
import { useWavesStore } from '~/stores/useWavesStore'

const { classes } = useTheme()

const { state: waves, waveOptions } = useWavesStore()

const styles = computed(() => waves.value.map((wave, index) => `
.path-${index}{
  animation:pathAnim-${index} 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes pathAnim-${index}{
  0%{
    d: path("${wave.d}");
  }
  25%{
    d: path("${wave?.animatedPath[0]}");
  }
  50%{
    d: path("${wave?.animatedPath[1]}");
  }
  75%{
    d: path("${wave?.animatedPath[2]}");
  }
  100%{
    d: path("${wave.d}");
  }
}`).join(''))

useStyleTag(styles)

// z--10 z--9 z--8 z--7 z--6 z--5 z--4 z--3 z--2 z--1 z-0 z-1 z-2 z-3 z-4 z-5 z-6 z-7 z-8 z-9 z-10
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
      :class="`path-${index} ${classes.fill}`"
      :d="wave.d"
      :fill-opacity="(1 / waveOptions.layerCount) * (index + 2)"
    />
  </svg>
</template>

<style>

</style>
