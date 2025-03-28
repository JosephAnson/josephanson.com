<script setup lang="ts">
const props = defineProps<{
  image?: {
    src?: string
    alt: string
  }
  imageClasses?: string
  contentClass?: string
}>()

const { classes } = useTheme()
</script>

<template>
  <div
    :class="cn('flex flex-col w-full overflow-hidden rounded-xl transition-all !duration-300 hover:shadow-xl !hover:scale-[1.02] h-full', classes.card, $attrs.class as string)"
  >
    <div
      v-if="props.image"
      :class="cn('relative aspect-video w-full', props.imageClasses)"
    >
      <NuxtImg
        v-if="props.image.src"
        :src="props.image.src"
        :alt="props.image.alt"
        width="400"
        format="webp"
        :placeholder="[50, 25, 75, 5]"
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 from-black/50 to-transparent bg-gradient-to-t opacity-0 transition-opacity duration-300 group-hover:scale-105 group-hover:opacity-10" />
    </div>

    <div :class="cn('p-6', contentClass)">
      <slot />
    </div>
  </div>
</template>
