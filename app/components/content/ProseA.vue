<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
  blank?: boolean
}>(), {
  href: '',
  blank: false,
})

const { classes } = useTheme()

function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  }
  catch {
    return false
  }
}
const isExternal = isHttpUrl(props.href)

const bindProps = computed(() => ({
  to: props.href,
  target: props.blank ? '_blank' : undefined,
  rel: props.blank ? 'noopener noreferrer' : undefined,
  external: isExternal,
}))
</script>

<template>
  <NuxtLink
    v-bind="bindProps"
    :class="classes.link"
    :prefetch="!isExternal"
  >
    <slot />
  </NuxtLink>
</template>
