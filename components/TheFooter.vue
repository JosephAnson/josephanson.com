<script setup lang="ts">
import TheWaves from '~/components/TheWaves.client.vue'
</script>

<template>
  <footer class="absolute bottom-0 z-200 mt-2 w-full pb-6 pt-2 md:mb-16 md:mt-10 md:pt-8">
    <BaseContainer>
      <div class="flex items-center justify-between">
        <div
          class="z-40 flex gap-4"
        >
          <BaseSocialIcons />
        </div>

        <div class="flex gap-4">
          <BaseToggleTheme class="z-40 !hidden !md:flex" />

          <ClientOnly>
            <TheWaves v-slot="{ changeWaves }">
              <button
                title="Change the waves"
                aria-label="Change the waves"
                class="z-40 h-6 w-6 flex bg-transparent hover:text-primary-500"
                @click="changeWaves"
              >
                <span class="i-ph:waves-duotone h-full w-full bg-none" />
              </button>
            </TheWaves>
          </ClientOnly>
        </div>
      </div>
    </BaseContainer>
  </footer>
</template>
