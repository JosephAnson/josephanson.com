<script lang="ts" setup>
import BaseLogo from '~/components/Base/BaseLogo.vue'

const show = useShowMenu()
const route = useRoute()
function toggleMenu() {
  show.value = !show.value
}
</script>

<template>
  <header class="print:hidden">
    <div class="relative z-20 py-4 md:py-16">
      <BaseContainer>
        <div class="flex items-center justify-between gap-4">
          <NuxtLink to="/" class="flex items-center whitespace-nowrap text-xl md:text-2xl">
            <BaseLogo class="mr-2 h-8 w-8" />

            J. Anson
          </NuxtLink>

          <div class="flex items-center gap-2 md:gap-4">
            <BaseGradientBorder v-if="route.path !== '/resume'">
              <BaseButton to="/open-for-work">
                Open for Work
              </BaseButton>
            </BaseGradientBorder>

            <div id="teleport-menu" />

            <BaseButton
              aria-label="Navigation Menu"
              @click="toggleMenu()"
            >
              <span class="sr-only">Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  v-if="!show"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </BaseButton>
          </div>
        </div>
      </BaseContainer>
    </div>
    <TheNav v-model:show="show" />
  </header>
</template>
