<script setup lang="ts">
import type { ColorModes } from '~~/types'

const colorMode = useColorMode()

function nextPreference() {
  const values: string[] = ['dark', 'light'] satisfies ColorModes[]
  const index = values.indexOf(colorMode.preference)
  return values[(index + 1) % values.length]
}

function easeOutTimeForProgress(progress: number) {
  const curvePosition = 1 - Math.cbrt(1 - progress)
  const inversePosition = 1 - curvePosition

  return 3 * inversePosition ** 2 * curvePosition * 0.16
    + 3 * inversePosition * curvePosition ** 2 * 0.3
    + curvePosition ** 3
}

function setThemeRevealGeometry() {
  const root = document.documentElement
  const surfaceWidth = Math.max(window.innerWidth, root.scrollWidth)
  const surfaceHeight = Math.max(window.innerHeight, root.scrollHeight)
  const rootFontSize = Number.parseFloat(getComputedStyle(root).fontSize)
  const originInset = rootFontSize * 2.4
  const farthestX = surfaceWidth - originInset
  const farthestY = surfaceHeight - originInset
  const overscan = 0
  const radius = Math.ceil(Math.hypot(farthestX, farthestY) + overscan)
  const previousRadius = Math.max(window.innerWidth, window.innerHeight) * 2
  const baseDuration = 2000
  const duration = Math.round(Math.min(2400, Math.max(baseDuration, baseDuration * radius / previousRadius)))
  const viewportRadius = Math.hypot(window.innerWidth - originInset, window.innerHeight - originInset) + 32
  const visibleProgress = Math.min(1, viewportRadius / radius)
  const visibleDuration = Math.ceil(duration * easeOutTimeForProgress(visibleProgress))

  root.style.setProperty('--theme-reveal-radius', `${radius}px`)
  root.style.setProperty('--theme-reveal-duration', `${duration}ms`)

  return visibleDuration
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
    startViewTransition?: (update: () => Promise<void>) => {
      ready: Promise<void>
      finished: Promise<void>
      skipTransition: () => void
    }
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!documentWithTransitions.startViewTransition || reduceMotion) {
    colorMode.preference = next
    return
  }

  const visibleDuration = setThemeRevealGeometry()
  document.documentElement.dataset.themeTransition = ''
  try {
    const transition = documentWithTransitions.startViewTransition(async () => {
      colorMode.preference = next
      await nextTick()
    })
    let completionTimer: number | undefined

    void transition.ready.then(() => {
      completionTimer = window.setTimeout(() => transition.skipTransition(), visibleDuration)
    }).catch(() => {})

    void transition.finished.catch(() => {}).finally(() => {
      window.clearTimeout(completionTimer)
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
