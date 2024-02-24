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

function onClose() {
  show.value = false
}
</script>

<template>
  <div
    ref="menu"
    class="menu pointer-events-none fixed right-0 top-0 h-full w-full py-4 transition-all duration-750 will-change-transform !z-500 md:py-16"
    :class="[
      classes.menu,
      { '!pointer-events-auto': show },
    ]"
    :style="{
      transform: !show
        ? `translateY(-100%)`
        : `translateY(0)`,
    }"
  >
    <BaseContainer class="h-full">
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
                :active-class="classes.textLight"
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

<style scoped>
.menu {
  view-transition-name: menu;
}

::view-transition-group(menu) {
  z-index: 200;
}
</style>
