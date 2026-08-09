<!-- Adapted from Canvas UI by David Haz (MIT + Commons Clause). -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

import {
  createDitheredObject,
  type DitheredObjectInstance,
  type DitheredObjectOptions,
} from "./DitheredObjectVanilla";

const props = defineProps<DitheredObjectOptions>();

const canvasEl = ref<HTMLCanvasElement | null>(null);
const available = ref(true);

let instance: DitheredObjectInstance | null = null;

onMounted(() => {
  if (canvasEl.value) {
    try {
      instance = createDitheredObject(
        { canvas: canvasEl.value },
        {
          ...props,
          onError: (error) => {
            instance?.destroy();
            instance = null;
            available.value = false;
            props.onError?.(error);
          },
        },
      );
      available.value = Boolean(instance);
    } catch (error) {
      available.value = false;
      props.onError?.(error);
    }
  }
});

onBeforeUnmount(() => {
  instance?.destroy();
  instance = null;
});

watch(
  () => ({ ...props }),
  (next) => instance?.setOptions(next),
  { deep: true },
);
</script>

<template>
  <div style="position: relative">
    <slot v-if="!available" name="fallback" />
    <canvas
      v-else
      ref="canvasEl"
      aria-hidden="true"
      role="presentation"
      style="
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        touch-action: none;
      "
    />
  </div>
</template>
