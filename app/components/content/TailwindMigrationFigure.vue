<script setup lang="ts">
const stages = [
  {
    label: 'Input',
    value: 'n-stack n-gap-l',
    detail: 'Start with one compound layout class and one explicit spacing choice.',
  },
  {
    label: 'Expand',
    value: 'n:flex n:flex-col n:gap-m n:gap-l',
    detail: 'Expand the compound class before deciding which utilities survive.',
  },
  {
    label: 'Resolve',
    value: 'Explicit wins',
    detail: 'Keep the explicit large gap and remove the medium gap introduced by the compound class.',
  },
  {
    label: 'Equivalent output',
    value: 'n:flex n:flex-col n:gap-l',
    detail: 'Emit one conflict-free expression with the same intended layout.',
  },
] as const

const activeStage = shallowRef(0)
const currentStage = computed(() => stages[activeStage.value]!)

function moveStage(direction: -1 | 1) {
  activeStage.value = Math.min(
    stages.length - 1,
    Math.max(0, activeStage.value + direction),
  )
}
</script>

<template>
  <ArticleFigure
    marker="Migration trace"
    caption="The migration rule interprets intent, resolves competing utilities, and emits one equivalent expression."
    description="The input classes n-stack and n-gap-l are expanded into flex, flex-column, a default medium gap and an explicit large gap. The priority rules preserve the explicit large gap and remove the conflicting default medium gap, producing n:flex, n:flex-col and n:gap-l. A second flow connects Nord design tokens to the Tailwind theme, Nord-prefixed utilities and consuming products."
    interactive
  >
    <ol class="diagram-flow migration-flow">
      <li
        v-for="(stage, index) in stages"
        :key="stage.label"
        class="diagram-node"
        :class="{
          'migration-stage--active': activeStage === index,
          'migration-stage--complete': index < activeStage,
        }"
      >
        <button
          type="button"
          :aria-pressed="activeStage === index"
          :aria-label="`Inspect stage ${index + 1}: ${stage.label}`"
          @click="activeStage = index"
        >
          <span class="diagram-index">{{ String(index + 1).padStart(2, '0') }} / {{ stage.label }}</span>
          <code v-if="index !== 2" class="diagram-code">{{ stage.value }}</code>
          <span v-else>
            <strong class="diagram-value">{{ stage.value }}</strong>
            <span class="diagram-label">Remove the compound default</span>
          </span>
        </button>
      </li>
    </ol>

    <section class="migration-inspector" aria-live="polite" aria-label="Selected migration stage">
      <div class="migration-inspector-copy">
        <span class="diagram-index">
          Stage {{ String(activeStage + 1).padStart(2, '0') }} / {{ String(stages.length).padStart(2, '0') }}
        </span>
        <strong>{{ currentStage.label }}</strong>
        <p>{{ currentStage.detail }}</p>
      </div>
      <div class="migration-controls" aria-label="Step through the migration">
        <button
          type="button"
          :disabled="activeStage === 0"
          @click="moveStage(-1)"
        >
          Previous
        </button>
        <button
          type="button"
          :disabled="activeStage === stages.length - 1"
          @click="moveStage(1)"
        >
          Next stage
        </button>
      </div>
    </section>

    <ol class="migration-system" aria-label="Styling system layers">
      <li>Design tokens</li>
      <li>Tailwind theme</li>
      <li>Nord utilities</li>
      <li>Product teams</li>
    </ol>
  </ArticleFigure>
</template>

<style scoped>
.migration-flow {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.migration-flow .diagram-node {
  min-height: 9.25rem;
  padding: 0;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.migration-flow .diagram-node.migration-stage--active {
  border-color: var(--site-accent);
  background: var(--site-accent-soft);
}

.migration-flow .diagram-node.migration-stage--complete {
  border-color: color-mix(in srgb, var(--site-accent) 48%, var(--site-line));
}

.migration-flow .diagram-node button {
  width: 100%;
  min-height: 100%;
  display: grid;
  align-content: space-between;
  gap: 1.25rem;
  padding: 1rem;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
}

.migration-flow .diagram-node button:focus-visible {
  outline: 2px solid var(--site-accent);
  outline-offset: -4px;
}

.migration-inspector {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.75rem;
  padding: 1.1rem;
  border: 1px solid var(--site-line-strong);
  background: var(--site-paper);
}

.migration-inspector-copy {
  display: grid;
  gap: 0.55rem;
}

.migration-inspector-copy strong {
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.45rem);
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  line-height: 1;
}

.migration-inspector-copy p {
  max-width: 42rem;
  margin: 0;
  color: var(--site-muted);
  font-size: 1rem;
  line-height: 1.55;
}

.migration-controls {
  display: flex;
  align-items: end;
  gap: 0;
}

.migration-controls button {
  min-height: var(--site-control-size);
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--site-line-strong);
  background: transparent;
  color: var(--site-ink);
  cursor: pointer;
  font-family: var(--site-font-display);
  font-size: 0.76rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  text-transform: uppercase;
}

.migration-controls button + button {
  border-left: 0;
}

.migration-controls button:hover:not(:disabled),
.migration-controls button:focus-visible {
  background: var(--site-accent-soft);
  color: var(--site-accent);
}

.migration-controls button:disabled {
  color: var(--site-faint);
  cursor: not-allowed;
}

.migration-system {
  display: grid;
  gap: 0;
  margin: 1.75rem 0 0;
  padding: 1.25rem 0 0;
  border-top: 1px solid var(--site-line);
  counter-reset: system-layer;
  list-style: none;
}

.migration-system li {
  position: relative;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--site-line);
  color: var(--site-muted);
  font-size: 0.76rem;
  text-align: center;
}

.migration-system li:not(:last-child) {
  border-bottom: 0;
}

.migration-system li:last-child {
  color: var(--site-accent);
}

@media (min-width: 40rem) {
  .migration-inspector {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .migration-system {
    grid-template-columns: repeat(4, 1fr);
  }

  .migration-system li:not(:last-child) {
    border-right: 0;
    border-bottom: 1px solid var(--site-line);
  }
}

@media (prefers-reduced-motion: reduce) {
  .migration-flow .diagram-node {
    transition: none;
  }
}

@media (max-width: 47.999rem) {
  .migration-flow {
    grid-template-columns: minmax(0, 1fr);
  }

  .migration-flow .diagram-node {
    min-height: 0;
  }
}
</style>
