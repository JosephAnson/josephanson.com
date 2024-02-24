<script lang="ts" setup>
defineProps<{
  text?: string
  to?: string
  icon?: string
}>()
const { classes } = useTheme()

// i-ph:read-cv-logo-duotone i-ph:laptop-duotone
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="inline-block">
    <button :class="classes.button" class="not-prose">
      <slot> {{ text }} </slot>

      <span v-if="icon" class="ml-2 h-5 w-5" :class="icon" />
    </button>
  </NuxtLink>
  <button v-else :class="classes.button" class="not-prose">
    <slot> {{ text }} </slot>
    <span v-if="icon" class="ml-2 h-5 w-5" :class="icon" />
  </button>
</template>
