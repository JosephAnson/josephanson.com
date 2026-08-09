<script setup lang="ts">
import type { ColorModes } from '~~/types'

const colorMode = useColorMode()

function nextPreference() {
  const values: string[] = ['dark', 'light'] satisfies ColorModes[]
  const index = values.indexOf(colorMode.preference)
  return values[(index + 1) % values.length]
}

function setThemeRevealGeometry() {
  const root = document.documentElement
  const surfaceWidth = Math.max(window.innerWidth, root.scrollWidth)
  const surfaceHeight = Math.max(window.innerHeight, root.scrollHeight)
  const rootFontSize = Number.parseFloat(getComputedStyle(root).fontSize)
  const originInset = rootFontSize * 2.4
  const farthestX = surfaceWidth - originInset
  const farthestY = surfaceHeight - originInset
  const overscan = Math.max(32, Math.max(surfaceWidth, surfaceHeight) * 0.04)
  const radius = Math.ceil(Math.hypot(farthestX, farthestY) + overscan)
  const previousRadius = Math.max(window.innerWidth, window.innerHeight) * 2
  const duration = Math.round(Math.min(880, Math.max(620, 620 * radius / previousRadius)))

  root.style.setProperty('--theme-reveal-radius', `${radius}px`)
  root.style.setProperty('--theme-reveal-duration', `${duration}ms`)
}

function clearThemeRevealGeometry() {
  const root = document.documentElement
  root.style.removeProperty('--theme-reveal-radius')
  root.style.removeProperty('--theme-reveal-duration')
}

async function onClick() {
  const next = nextPreference()

  if (!next)
    return

  const documentWithTransitions = document as Document & {
    startViewTransition?: (update: () => Promise<void>) => { finished: Promise<void> }
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!documentWithTransitions.startViewTransition || reduceMotion) {
    colorMode.preference = next
    return
  }

  setThemeRevealGeometry()
  document.documentElement.dataset.themeTransition = ''
  try {
    const transition = documentWithTransitions.startViewTransition(async () => {
      colorMode.preference = next
      await nextTick()
    })

    void transition.finished.catch(() => {}).finally(() => {
      delete document.documentElement.dataset.themeTransition
      clearThemeRevealGeometry()
    })
  }
  catch {
    delete document.documentElement.dataset.themeTransition
    clearThemeRevealGeometry()
    colorMode.preference = next
  }
}

const nextMode = computed(() => colorMode.preference === 'dark' ? 'light' : 'dark')
</script>

<template>
  <button
    type="button"
    class="appearance-toggle site-icon"
    :aria-label="`Switch to ${nextMode} mode`"
    :title="`Switch to ${nextMode} mode`"
    @click="onClick"
  >
    <span class="appearance-toggle-icon" aria-hidden="true">
      <ColorScheme>
        <span v-if="colorMode.preference === 'dark'" class="i-ph:moon h-4 w-4" />
        <span v-else class="i-ph:sun h-4 w-4" />
      </ColorScheme>
    </span>
  </button>
</template>
