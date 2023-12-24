<script lang="ts" setup>
import BaseButton from '~/components/BaseButton.vue'

const props = defineProps<{
  show: boolean
}>()

const emits = defineEmits(['update:show'])

const show = useVModel(props, 'show', emits)

const { navigation } = useContent()

const menu = ref()
const closeButton = ref()
const { x: buttonX, y: buttonY, height, width } = useElementBounding(closeButton)

function onClose() {
  show.value = false
}

watch(show, (newShow) => {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition)
    return

  const x = buttonX.value + width.value / 2
  const y = buttonY.value + height.value

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition()
  transition.ready
    .then(() => {
      const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      document.documentElement.animate(
        {
          clipPath: !newShow
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-in-out',
          pseudoElement: !newShow
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
})
</script>

<template>
  <div
    ref="menu"
    class="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center bg-white py-10 opacity-0 transition-all transition-duration-250 dark:bg-black md:py-19"
    :class="{
      'opacity-100 !pointer-events-auto': show,
    }"
  >
    <Container class="h-100%">
      <div class="relative h-full flex items-center">
        <BaseButton ref="closeButton" class="absolute right-0 top-0 rounded bg-white:20 px-4 py-2" aria-label="Navigation Menu" @click="onClose">
          Close
        </BaseButton>
        <nav>
          <ul class="flex flex-col">
            <li
              v-for="link of navigation"
              :key="link._path"
            >
              <NuxtLink
                :to="link._path"
                class="group relative text-5xl leading-loose md:text-7xl md:leading-loose"
                :class="{ 'text-primary-500': $route.path === link._path }"
                @click="onClose"
              >
                <span class="absolute bottom--4px h-1px w-0 bg-primary-500 transition-width duration-200 ease-in-out group-hover:w-full" />
                {{ link.title }}
              </NuxtLink>
            </li>

            <slot />
          </ul>
        </nav>
      </div>
    </Container>
  </div>
</template>
