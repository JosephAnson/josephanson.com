<script setup lang="ts">
// Adapted from Canvas UI by David Haz.
// Source: https://canvasui.dev/docs/components/particle-object
// License: MIT + Commons Clause.
import { nextTick, onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue'
import {
  createParticleObject,
  type ParticleObjectInstance,
  type ParticleObjectOptions,
} from './ParticleObjectVanilla'

const props = defineProps<ParticleObjectOptions>()

const canvasEl = useTemplateRef<HTMLCanvasElement>('canvas')
const available = shallowRef(true)
const loaded = shallowRef(false)

let instance: ParticleObjectInstance | null = null

function options(next: ParticleObjectOptions): ParticleObjectOptions {
  return {
    ...next,
    onLoad: () => {
      loaded.value = true
      next.onLoad?.()
    },
    onError: (error) => {
      available.value = false
      instance?.destroy()
      instance = null
      next.onError?.(error)
    },
  }
}

onMounted(async () => {
  await nextTick()
  if (!canvasEl.value)
    return

  instance = createParticleObject({ canvas: canvasEl.value }, options(props))
  if (!instance)
    available.value = false
})

onBeforeUnmount(() => {
  instance?.destroy()
  instance = null
})

watch(
  () => ({ ...props }),
  next => instance?.setOptions(options(next)),
  { deep: true },
)
</script>

<template>
  <div class="relative">
    <canvas
      v-if="available"
      ref="canvas"
      role="presentation"
      aria-hidden="true"
      class="absolute inset-0 block h-full w-full touch-none transition-opacity duration-500"
      :class="loaded ? 'opacity-100' : 'opacity-0'"
    />
    <slot v-else name="fallback" />
  </div>
</template>
