import { waveInit } from '~/utils/wave'

export function useWavesStore() {
  const waveOptions = {
    height: 400,
    width: 1440,
    segmentCount: 12,
    layerCount: 12,
    variance: 1.2,
  }

  const state = useState(() => waveInit(waveOptions))

  function changeWaves() {
    state.value = waveInit(waveOptions)
  }

  return {
    state,
    waveOptions,
    changeWaves,
  }
}
