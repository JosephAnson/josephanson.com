import { waveInit } from '~/utils/wave'

export function useWavesStore() {
  const { width } = useWindowSize()

  const waveOptions = computed(() => ({
    height: 580,
    width: width.value,
    segmentCount: width.value >= 1000 ? 12 : 6,
    layerCount: 12,
    variance: 1.2,
  }))

  const state = useState(() => waveInit(waveOptions.value))

  function changeWaves() {
    state.value = waveInit(waveOptions.value)
  }

  watch(width, changeWaves, { immediate: true })

  return {
    state,
    waveOptions,
    changeWaves,
  }
}
