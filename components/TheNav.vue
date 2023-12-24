<script lang="ts" setup>
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

const x = computed(() => buttonX.value + width.value / 2)
const y = computed(() => buttonY.value + height.value / 2)

const endRadius = computed(() => Math.hypot(
  Math.max(x.value, innerWidth - x.value),
  Math.max(y.value, innerHeight - y.value),
))
</script>

<template>
  <div
    ref="menu"
    class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 bg-white py-8 transition-all transition-duration-500 ease-out dark:bg-black md:py-16"
    :class="{
      '!pointer-events-auto': show,
    }"
    :style="{
      clipPath: !show
        ? `circle(0px at calc(${x}px - 0.75rem) calc(${y}px - 0.75rem))`
        : `circle(${endRadius}px at calc(${x}px - 0.75rem) calc(${y}px - 0.75rem))`,
    }"
  >
    <TheRays />
    <BaseContainer class="h-100%">
      <div class="relative h-full flex items-center">
        <BaseButton ref="closeButton" class="absolute right-0 top-0" aria-label="Navigation Menu" @click="onClose">
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
                class="group relative text-5xl font-bold leading-loose md:text-7xl md:leading-loose"
                :class="{ 'text-primary-500': $route.path === link._path }"
                @click="onClose"
              >
                <span class="absolute bottom--4px h-2px w-0 bg-primary-500 transition-width duration-200 ease-in-out group-hover:w-full" />
                {{ link.title }}
              </NuxtLink>
            </li>

            <slot />
          </ul>
        </nav>
      </div>
    </BaseContainer>
  </div>
</template>
