<script setup lang="ts">
const show = useShowMenu()
</script>

<template>
  <footer class="fixed bottom-6 z-2000 mt-2 w-full pt-2 md:bottom-12 md:mt-10 md:pt-8">
    <BaseContainer>
      <div class="flex items-center justify-between">
        <BaseSocialIcons class="z-40" />

        <BaseToggleTheme class="z-40" />
      </div>
    </BaseContainer>
  </footer>

  <TheWaves
    class="pointer-events-none fixed bottom-0 left-0"
    :style="{
      transform: show
        ? `translateY(-100%)`
        : `translateY(0%)`,
    }"
  />
</template>
