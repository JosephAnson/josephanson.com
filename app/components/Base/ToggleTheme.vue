<script setup lang="ts">
import type { ColorModes } from '~~/types'
import { capitalize } from 'vue'

const colorMode = useColorMode()
const currentTheme = useCurrentTheme()

const { rotateTheme, classes } = useTheme()

const capitalizedCurrentTheme = computed(() => capitalize(currentTheme.value))

function onClick() {
  const values: string[] = ['dark', 'light'] satisfies ColorModes[]
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length

  if (values[next])
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
      <span class="i-ph:palette-duotone h-6 flex-shrink-0 bg-none" />
    </button>

    <button
      aria-label="Color Mode"
      :class="`h-6 ${classes.icon} w-6 flex bg-transparent`"
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
