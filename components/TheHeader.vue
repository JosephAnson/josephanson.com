<script lang="ts" setup>
import BaseButton from '~/components/BaseButton.vue'

const show = ref(false)

function toggleMenu() {
  show.value = !show.value
}
</script>

<template>
  <header class="relative pb-16">
    <Container>
      <div class="flex items-start justify-between gap-16">
        <NuxtLink to="/" class="flex text-2xl font-serif">
          J. Anson
        </NuxtLink>

        <div class="flex items-center gap-4">
          <ToggleTheme class="sm:hidden" />
          <BaseButton class="rounded bg-white:20 px-4 py-2" aria-label="Navigation Menu" @click="toggleMenu()">
            Menu
          </BaseButton>
        </div>
      </div>
    </Container>
  </header>

  <MainNav v-model:show="show" />
</template>
