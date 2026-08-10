<script setup lang="ts">
const props = withDefaults(defineProps<{
  caption: string
  description: string
  marker?: string
  interactive?: boolean
  wide?: boolean
}>(), {
  marker: 'Figure',
  interactive: false,
  wide: false,
})

const instanceId = useId().replaceAll(':', '')
const captionId = `article-figure-caption-${instanceId}`
const descriptionId = `article-figure-description-${instanceId}`
</script>

<template>
  <figure
    class="article-figure not-prose"
    :class="{ 'article-figure--wide': props.wide }"
    :aria-labelledby="captionId"
    :aria-describedby="descriptionId"
  >
    <div class="article-figure-register" aria-hidden="true">
      <span>{{ marker }}</span>
      <span class="article-figure-register-line" />
      <span>Joseph Anson / Notes</span>
    </div>

    <div
      class="article-figure-canvas"
      :aria-hidden="interactive ? undefined : 'true'"
    >
      <slot />
    </div>

    <figcaption :id="captionId" class="article-figure-caption">
      {{ caption }}
    </figcaption>
    <p :id="descriptionId" class="site-visually-hidden">
      {{ description }}
    </p>
  </figure>
</template>

<style scoped>
.article-figure {
  width: 100%;
  margin: clamp(3.5rem, 8vw, 6rem) 0;
  border-block: 1px solid var(--site-line-strong);
  background: color-mix(in srgb, var(--site-panel) 84%, transparent);
  color: var(--site-ink);
}

.article-figure-register {
  min-height: 2.4rem;
  display: grid;
  grid-template-columns: auto minmax(2rem, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  padding-inline: clamp(1rem, 3vw, 1.5rem);
  border-bottom: 1px solid var(--site-line);
  color: var(--site-accent);
  font-family: var(--site-font-display);
  font-size: 0.66rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.065em;
  text-transform: uppercase;
}

.article-figure-register-line {
  height: 1px;
  background: var(--site-line);
}

.article-figure-canvas {
  padding: clamp(1.25rem, 4vw, 2.5rem);
}

.article-figure-caption {
  margin: 0;
  padding: 1rem clamp(1rem, 3vw, 1.5rem) 1.15rem;
  border-top: 1px solid var(--site-line);
  color: var(--site-muted);
  font-size: 0.84rem;
  line-height: 1.55;
}

:deep(.diagram-flow) {
  display: grid;
  gap: 1.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

:deep(.diagram-node) {
  position: relative;
  min-width: 0;
  display: grid;
  align-content: space-between;
  gap: 1.25rem;
  padding: 1rem;
  border: 1px solid var(--site-line-strong);
  background: var(--site-paper);
}

:deep(.diagram-node::after) {
  position: absolute;
  z-index: 1;
  background: var(--site-accent);
  content: "";
}

:deep(.diagram-node:last-child::after) {
  display: none;
}

:deep(.diagram-index) {
  color: var(--site-accent);
  font-family: var(--site-font-display);
  font-size: 0.66rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.065em;
}

:deep(.diagram-value) {
  display: block;
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-size: clamp(1.45rem, 4vw, 2.4rem);
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: -0.025em;
  line-height: 0.94;
  overflow-wrap: anywhere;
}

:deep(.diagram-label) {
  display: block;
  margin-top: 0.45rem;
  color: var(--site-muted);
  font-size: 0.78rem;
  line-height: 1.45;
}

:deep(.diagram-code) {
  color: var(--site-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.78rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

@media (min-width: 48rem) {
  .article-figure--wide {
    width: min(64rem, calc(100vw - 4rem));
  }

  :deep(.diagram-flow) {
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
  }

  :deep(.diagram-node::after) {
    top: 50%;
    right: -1.76rem;
    width: 1.75rem;
    height: 1px;
  }

  :deep(.diagram-node::before) {
    position: absolute;
    z-index: 2;
    top: calc(50% - 0.2rem);
    right: -1.95rem;
    width: 0.42rem;
    height: 0.42rem;
    border-top: 1px solid var(--site-accent);
    border-right: 1px solid var(--site-accent);
    content: "";
    transform: rotate(45deg);
  }

  :deep(.diagram-node:last-child::before) {
    display: none;
  }
}

@media (max-width: 47.999rem) {
  :deep(.diagram-node::after) {
    bottom: -1.76rem;
    left: 50%;
    width: 1px;
    height: 1.75rem;
  }

  :deep(.diagram-node::before) {
    position: absolute;
    z-index: 2;
    bottom: -1.95rem;
    left: calc(50% - 0.2rem);
    width: 0.42rem;
    height: 0.42rem;
    border-right: 1px solid var(--site-accent);
    border-bottom: 1px solid var(--site-accent);
    content: "";
    transform: rotate(45deg);
  }

  :deep(.diagram-node:last-child::before) {
    display: none;
  }
}

@media print {
  .article-figure {
    break-inside: avoid;
    background: transparent;
  }

  .article-figure-register {
    color: currentColor;
  }
}
</style>
