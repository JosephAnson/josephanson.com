<script lang="ts" setup>
defineProps<{
  text?: string
  to?: string
  icon?: string
  disabled?: boolean
}>()
const { classes } = useTheme()

// i-ph:read-cv-logo-duotone i-ph:laptop-duotone
</script>

<template>
  <NuxtLink v-if="to" :to="to" :aria-disabled="disabled" class="inline-block" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
    <button class="not-prose" :disabled="disabled" :class="[classes.button, { 'opacity-50 cursor-not-allowed': disabled }]">
      <slot> {{ text }} </slot>

      <span v-if="icon" class="ml-2 h-5 w-5" :class="icon" />
    </button>
  </NuxtLink>
  <button v-else class="not-prose" :disabled="disabled" :class="[classes.button, { 'opacity-50 cursor-not-allowed': disabled }]">
    <slot> {{ text }} </slot>
    <span v-if="icon" class="ml-2 h-5 w-5" :class="icon" />
  </button>
</template>
