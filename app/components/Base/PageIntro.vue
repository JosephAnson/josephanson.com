<script setup lang="ts">
defineProps<{
  /** Ordered route label, such as `01 / Work`. */
  index: string
  /** Supporting sentence shown beneath the page title. */
  lead: string
}>()
</script>

<template>
  <header class="page-intro">
    <p class="page-kicker">
      {{ index }}
    </p>
    <h1 class="index-title">
      <slot />
    </h1>
    <p class="page-lead">
      {{ lead }}
    </p>
  </header>
</template>
