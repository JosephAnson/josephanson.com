<script lang="ts" setup>
defineProps<{
  text?: string
  to?: string
}>()
const { classes } = useTheme()
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="inline-block">
    <button :class="classes.button" class="not-prose">
      <slot> {{ text }} </slot>
    </button>
  </NuxtLink>
  <button v-else :class="classes.button" class="not-prose">
    <slot> {{ text }} </slot>
  </button>
</template>
