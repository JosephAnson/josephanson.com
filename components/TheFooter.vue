<script setup lang="ts">
import { useWavesStore } from '~/stores/useWavesStore'

const { rotateTheme } = useTheme()
const currentTheme = useCurrentTheme()
const { changeWaves } = useWavesStore()
</script>

<template>
  <footer class="fixed bottom-6 z-20 mt-2 w-full pt-2 md:bottom-12 md:mt-10 md:pt-8">
    <BaseContainer>
      <div class="flex items-center justify-between">
        <div
          class="z-40 flex gap-4"
        >
          <BaseSocialIcons />
        </div>

        <div class="flex gap-4">
          <BaseToggleTheme class="z-40 !hidden !md:flex" />

          <button
            title="Change the waves"
            aria-label="Change the waves"
            :class="`z-40 h-6 w-6 flex bg-transparent hover:text-${currentTheme}-500 dark:hover:text-${currentTheme}-300`"
            @click="rotateTheme"
          >
            <span class="i-ph:paint-brush-duotone h-full w-full bg-none" />
          </button>

          <button
            title="Change the waves"
            aria-label="Change the waves"
            :class="`z-40 h-6 w-6 flex bg-transparent hover:text-${currentTheme}-500 dark:hover:text-${currentTheme}-300`"
            @click="changeWaves"
          >
            <span class="i-ph:waves-duotone h-full w-full bg-none" />
          </button>
        </div>
      </div>
    </BaseContainer>
  </footer>

  <TheWaves />
</template>
