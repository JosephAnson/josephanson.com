<script lang="ts" setup>
const props = defineProps<{
  show: boolean
}>()

const emits = defineEmits(['update:show'])

const show = useVModel(props, 'show', emits)

const menu = ref()
const closeButton = ref()

const { navigation } = useContent()
const { classes } = useTheme()

const { x: buttonX, y: buttonY, height, width } = useElementBounding(closeButton)

const x = computed(() => (buttonX.value + width.value / 2) + 13)
const y = computed(() => (buttonY.value + height.value / 2) + 13)

const endRadius = computed(() => Math.hypot(
  Math.max(x.value, innerWidth),
  Math.max(y.value, innerHeight),
))

function onClose() {
  show.value = false
}
</script>

<template>
  <div
    ref="menu"
    :class="{
      [`pointer-events-none h-dvh fixed bottom-0 left-0 right-0 top-0 !z-500 ${classes.menu} py-4 will-change transition-all duration-800 md:py-16`]: true,
      '!pointer-events-auto': show,
    }"
    :style="{
      clipPath: !show
        ? `circle(0px at calc(${x}px - 0.75rem) calc(${y}px - 0.75rem))`
        : `circle(${endRadius}px at calc(${x}px - 0.75rem) calc(${y}px - 0.75rem))`,
    }"
  >
    <BaseContainer class="h-dvh">
      <div class="relative h-full flex items-center">
        <BaseButton
          ref="closeButton"
          class="absolute right-0 top-0 rounded bg-white:20 px-4 py-2"
          aria-label="Navigation Menu"
          @click="onClose"
        >
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
                :class="{
                  [classes.textLight]: $route.path === link._path,
                }"
                @click="onClose"
              >
                <span :class="`absolute bottom--4px h-2px w-0 ${classes.menuUnderline} transition-width duration-200 ease-in-out group-hover:w-full`" />
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
