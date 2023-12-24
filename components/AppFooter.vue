<script setup lang="ts">

</script>

<template>
  <footer
    class="mt-24 flex flex-col items-center justify-center py-8"
  >
    <div class="hidden sm:mb-8 sm:flex sm:text-base sm:font-medium">
      <MainNav />
    </div>

    <p class="mb-4 text-center">
      Follow me on
    </p>

    <div
      class="grid grid-cols-12 w-full items-center justify-between gap-4"
    >
      <div class="xs:col-span-4 xs:col-start-5 col-span-12 mb-8 flex justify-center gap-4">
        <SocialIcons />
      </div>
    </div>
  </footer>
</template>
