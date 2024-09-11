<script lang="ts" setup>
import { computed } from 'vue'
import { waveInit } from '~/utils/wave'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'title',
    description: 'description',
  },
)

const title = computed(() => props.title.slice(0, 60))

const waves = waveInit({
  height: 580,
  width: 1200,
  segmentCount: 12,
  layerCount: 12,
  variance: 1.2,
})
</script>

<template>
  <div class="absolute bottom-0 left-0 h-full w-full flex flex-col justify-center bg-blue-800 font-sans">
    <svg
      v-for="(wave, index) in waves"
      :key="index"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 300"
      class="absolute bottom-0 left-0 w-[2000px]"
    >
      <path
        :d="wave.d"
        :fill-opacity="(1 / 12) * (index + 1) "
        stroke="rgba(255,255,255,0.1)"
        class="absolute bottom-0"
      />
    </svg>

    <div class="w-[1000px] pl-[100px]">
      <p class="mb-4 text-[24px] text-blue-400 font-semibold uppercase">
        Joseph Anson
      </p>
      <h1 class="m-0 mb-4 flex items-center text-[75px] text-white font-semibold">
        <span>{{ title }}</span>
      </h1>
      <p class="text-[32px] text-blue-100 leading-tight">
        {{ description.slice(0, 200) }}
      </p>
    </div>
  </div>
</template>
