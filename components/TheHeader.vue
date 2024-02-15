<script lang="ts" setup>
const { currentTheme } = useTheme()

const show = ref(false)

function toggleMenu() {
  show.value = !show.value
}
</script>

<template>
  <header>
    <div class="relative py-4 md:py-16">
      <BaseContainer>
        <div class="flex items-center justify-between gap-16">
          <NuxtLink to="/" class="flex text-2xl font-serif">
            J. Anson
          </NuxtLink>

          <div class="flex items-center gap-4">
            <BaseToggleTheme />
            <BaseButton :theme="currentTheme" aria-label="Navigation Menu" @click="toggleMenu()">
              Menu
            </BaseButton>
          </div>
        </div>
      </BaseContainer>
    </div>
    <TheNav v-model:show="show" />
  </header>
</template>
