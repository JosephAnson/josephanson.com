<script setup lang="ts">
import type { ColorModes } from '~/types'

const colorMode = useColorMode()
const currentTheme = useCurrentTheme()

function onClick() {
  const values: string[] = ['dark', 'light'] satisfies ColorModes[]
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length

  colorMode.preference = values[next]
}
</script>

<template>
  <button aria-label="Color Mode" :class="`h-6 hover:text-${currentTheme}-500 dark:hover:text-${currentTheme}-300 w-6 flex bg-transparent`" @click="onClick">
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
</template>
