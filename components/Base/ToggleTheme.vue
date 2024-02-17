<script setup lang="ts">
import { capitalize } from 'vue'
import type { ColorModes } from '~/types'
import { useWavesStore } from '~/stores/useWavesStore'

const colorMode = useColorMode()
const currentTheme = useCurrentTheme()

const { rotateTheme, classes } = useTheme()
const { changeWaves } = useWavesStore()

const capitalizedCurrentTheme = computed(() => capitalize(currentTheme.value))

function onClick() {
  const values: string[] = ['dark', 'light'] satisfies ColorModes[]
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length

  colorMode.preference = values[next]
}
</script>

<template>
  <div class="flex gap-4">
    <button
      title="Change the theme"
      aria-label="Change the theme"
      :class="`z-40 h-6 flex bg-transparent items-center ${classes.icon}`"
      @click="rotateTheme"
    >
      <span class="mr-2 text-sm">{{ capitalizedCurrentTheme }}</span>
      <span class="i-ph:paint-brush-duotone h-6 flex-shrink-0 bg-none" />
    </button>

    <button
      title="Change the waves"
      aria-label="Change the waves"
      :class="`z-40 h-6 w-6 flex bg-transparent ${classes.icon}`"
      @click="changeWaves"
    >
      <span class="i-ph:waves-duotone h-full w-full bg-none" />
    </button>

    <button
      aria-label="Color Mode"
      :class="`h-6 hover:text-${currentTheme}-500 dark:hover:text-${currentTheme}-300 w-6 flex bg-transparent`"
      @click="onClick"
    >
      <ColorScheme>
        <template v-if="colorMode.preference === 'dark'">
          <div class="i-ph:moon-duotone h-full w-full" />
          <span class="sr-only">Dark mode</span>
        </template>
        <template v-else-if="colorMode.preference === 'light'">
          <div class="i-ph:sun-duotone h-full w-full" />
          <span class="sr-only">Light mode</span>
        </template>
        <template v-else>
          <div class="i-ph:desktop-duotone h-full w-full" />
          <span class="sr-only">System mode</span>
        </template>
      </ColorScheme>
    </button>
  </div>
</template>
