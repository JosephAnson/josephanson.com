<script lang="ts" setup>
const props = defineProps<{
  text?: string
  to?: string
  href?: string
  icon?: string
  disabled?: boolean
  overrideTheme?: string
}>()

const { currentTheme } = useTheme()
const classes = computed(() => themeClasses(props.overrideTheme ?? currentTheme.value))
// i-ph:read-cv-logo-duotone i-ph:laptop-duotone
</script>

<template>
  <NuxtLink
    v-if="to || href" :to="to" :aria-disabled="disabled"
    :href="href" class="not-prose inline-block flex items-center bg-none !no-underline"
    :class="cn('px-4 py-2', classes.button, disabled && 'opacity-50 cursor-not-allowed', $attrs.class?.toString())" :disabled="disabled"
  >
    <span v-if="icon" class="mr-2 h-5 w-5" :class="icon" />
    <slot> {{ text }} </slot>
  </NuxtLink>
  <button v-else class="not-prose" :disabled="disabled" :class="cn('px-4 py-2', classes.button, disabled && 'opacity-50 cursor-not-allowed', $attrs.class?.toString())">
    <span v-if="icon" class="mr-2 h-5 w-5" :class="icon" />
    <slot> {{ text }} </slot>
  </button>
</template>
