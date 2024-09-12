<script lang="ts" setup>
import BaseLogo from '~/components/Base/BaseLogo.vue'

const show = useShowMenu()

function toggleMenu() {
  show.value = !show.value
}
</script>

<template>
  <header class="print:hidden">
    <div class="relative z-20 py-4 md:py-16">
      <BaseContainer>
        <div class="flex items-center justify-between gap-4">
          <NuxtLink to="/" class="flex text-2xl">
            <BaseLogo class="mr-2 h-8 w-8" />

            J. Anson
          </NuxtLink>

          <div class="flex items-center gap-4">
            <div id="teleport-menu" />
            <BaseButton aria-label="Navigation Menu" @click="toggleMenu()">
              Menu
            </BaseButton>
          </div>
        </div>
      </BaseContainer>
    </div>
    <TheNav v-model:show="show" />
  </header>
</template>
