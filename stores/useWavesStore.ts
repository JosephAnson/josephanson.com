import { waveInit } from '~/utils/wave'

export function useWavesStore() {
  const { width } = useWindowSize()

  const breakpoint = computed(() => width.value >= 1000)
  const waveOptions = computed(() => ({
    height: breakpoint.value ? 580 : 250,
    width: width.value,
    segmentCount: breakpoint.value ? 12 : 6,
    layerCount: 12,
    variance: breakpoint.value ? 1.2 : 1,
  }))

  const state = useState(() => waveInit(waveOptions.value))

  const animationStyles = computed(() => state.value.map((wave, index) => `
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

  useStyleTag(animationStyles)

  function changeWaves() {
    state.value = waveInit(waveOptions.value)
  }

  watch(width, changeWaves, { immediate: true })

  return {
    state,
    waveOptions,
    animationStyles,
    changeWaves,
  }
}
