<script lang="ts" setup>
const menu = ref()
const closeButton = ref()

const { navigation } = useContent()
const { classes } = useTheme()
const show = useShowMenu()

function onClose() {
  show.value = false
}
</script>

<template>
  <div
    ref="menu"
    class="menu pointer-events-none fixed right-0 top-0 h-full w-full transform-gpu transition-all duration-1000 ease-in-out will-change-transform !z-500"
    :class="[
      { '!pointer-events-auto': show },
    ]"
    :style="{
      transform: !show
        ? `translateY(100%)`
        : `translateY(0%)`,
    }"
  >
    <TheWaves :amount="3" class="absolute bottom-[-1px] z-0 translate-y--100dvh transition-all duration-500 ease-in-out" />

    <div class="relative z-10 h-full py-4 transition-colors duration-300 md:py-16" :class="[classes.menu]">
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
                  class="group relative text-5xl font-bold leading-loose transition-colors duration-300 md:text-7xl md:leading-loose"
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
  </div>
</template>
