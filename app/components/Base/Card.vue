<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  image?: {
    src?: string
    alt: string
  }
  imageClasses?: string
  contentClass?: string
  tags?: string[]
  gradientSize?: number
  gradientColor?: string
}>()

const { classes } = useTheme()

// Gradient Hover Effect Logic
const gradientSize = computed(() => props.gradientSize ?? 200)
const gradientColor = computed(() => props.gradientColor ?? 'rgba(180, 180, 180, 0.1)')

const mouseX = ref(-gradientSize.value * 10)
const mouseY = ref(-gradientSize.value * 10)

function handleMouseMove(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

function handleMouseLeave() {
  mouseX.value = -gradientSize.value * 10
  mouseY.value = -gradientSize.value * 10
}

onMounted(() => {
  mouseX.value = -gradientSize.value * 10
  mouseY.value = -gradientSize.value * 10
})

const backgroundStyle = computed(() => {
  return `radial-gradient(
    circle ${gradientSize.value}px at ${mouseX.value}px ${mouseY.value}px,
    ${gradientColor.value},
    transparent
  )`
})
</script>

<template>
  <div
    :class="cn('group relative flex flex-col w-full overflow-hidden rounded-xl transition-all !duration-300 hover:shadow-xl !hover:scale-[1.02] h-full', classes.card, $attrs.class as string)"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Gradient Overlay -->
    <div
      class="pointer-events-none absolute inset-0 z-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{ background: backgroundStyle }"
    />

    <!-- Existing Card Content -->
    <div
      v-if="props.image"
      :class="cn('relative z-10 aspect-video w-full', props.imageClasses)"
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

      <BaseTagList v-if="tags" :tags="tags" class="absolute bottom-2 left-2 z-10" />
    </div>

    <div :class="cn('relative z-10 p-6', contentClass)">
      <slot />
    </div>
  </div>
</template>
