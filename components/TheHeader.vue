<script lang="ts" setup>
const show = ref(false)

function toggleMenu() {
  show.value = !show.value
}
</script>

<template>
  <header>
    <div class="relative z-20 py-4 md:py-16">
      <BaseContainer>
        <div class="flex items-center justify-between gap-16">
          <NuxtLink to="/" class="flex text-2xl">
            <span class="i-ph:user-circle-duotone mr-2" />

            J. Anson
          </NuxtLink>

          <div class="flex items-center gap-4">
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
