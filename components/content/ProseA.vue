<script setup>
const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  blank: {
    type: Boolean,
    default: false,
  },
})

const { classes } = useTheme()

function isHttpUrl(string) {
  let url
  try {
    url = new URL(string)
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}
const isExternal = isHttpUrl(props.href)

const bindProps = {
  to: props.href,
}

if (isExternal || props.blank)
  bindProps.target = '_blank'
</script>

<template>
  <NuxtLink
    v-bind="bindProps"
    :class="classes.link"
    :prefetch="true"
  >
    <slot />
  </NuxtLink>
</template>
