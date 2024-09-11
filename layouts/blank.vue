<script setup lang="ts">
</script>

<template>
  <TheHeader />

  <main>
    <BaseContainer class="relative z-10 text-sm md:text-base">
      <div class="max-w-none pb-30 prose">
        <slot />
      </div>
    </BaseContainer>
  </main>

  <TheFooter />
</template>
