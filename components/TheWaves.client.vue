<script lang="ts" setup>
import { themeConfig } from '~/utils/constants'
import { Wavery, waveInit } from '~/utils/wave'

const route = useRoute()
const colorMode = useColorMode()

const waveColor = computed(() => {
  if (route.path === '/')
    return colorMode.preference === 'dark' ? themeConfig.colors.primary['800'] : themeConfig.colors.primary['300']

  return colorMode.preference === 'dark' ? themeConfig.colors.secondary['800'] : themeConfig.colors.secondary['300']
})

const waveOptions = {
  height: 400,
  width: 1440,
  segmentCount: 12,
  layerCount: 12,
  variance: 1.2,
}

const wavery = new Wavery(waveOptions)

const waves = ref(wavery.generateSvg())

function changeWaves() {
  waves.value = waveInit(waveOptions)
}

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
</script>

<template>
  <slot :change-waves="changeWaves" />

  <svg
    v-for="(wave, index) in waves"
    :key="index" xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${waveOptions.width} ${waveOptions.height}`"
    :class="`fixed left-0 pointer-events-none bottom-0 z-${index}`"
  >
    <path
      class="transition-all duration-300"
      :class="`path-${index}`"
      :fill="waveColor"
      :d="wave.d"
      :fill-opacity="(1 / waveOptions.layerCount) * (index + 1)"
    />
  </svg>
</template>
