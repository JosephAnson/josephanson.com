<script setup lang="ts">
const stages = [
  {
    label: 'Inventory',
    value: '117',
    summary: 'production custom elements classified',
    detail: 'Define the complete component surface before choosing representative work.',
  },
  {
    label: 'Workloads',
    value: '42',
    summary: 'trusted, deterministic scenarios',
    detail: 'Turn the inventory into repeatable interactions that can be compared over time.',
  },
  {
    label: 'Measure',
    value: 'Input → paint',
    summary: 'Event Timing, layout and rendering traces',
    detail: 'Measure interaction timing and rendering work as separate browser signals.',
  },
  {
    label: 'Contract',
    value: 'p75 + ceiling',
    summary: 'reviewed per-scenario limits',
    detail: 'Apply a scenario-specific percentile budget and an absolute upper bound.',
  },
  {
    label: 'CI',
    value: '4 + 1',
    summary: 'component shards and App Shell',
    detail: 'Run the suite across four component shards and one application-shell check.',
  },
] as const

const evidence = [
  {
    id: 'timing',
    label: 'Interaction timing',
    description: 'Latency from input to the next visual update.',
    metrics: [
      ['Within 32ms', '37 / 42'],
      ['Dense Combobox', '64ms'],
      ['App Shell', '56ms'],
    ],
  },
  {
    id: 'rendering',
    label: 'Rendering work',
    description: 'Paint cost kept separate from interaction latency.',
    metrics: [
      ['Painted area', '7.6× viewport'],
      ['Full paints', '1'],
    ],
  },
] as const

const activeStage = shallowRef(0)
const activeEvidence = shallowRef(0)
const selectedStage = computed(() => stages[activeStage.value]!)
const selectedEvidence = computed(() => evidence[activeEvidence.value]!)
</script>

<template>
  <ArticleFigure
    marker="Performance contract"
    caption="The component suite turns a complete inventory into reviewed interaction and rendering budgets."
    description="A five-stage pipeline starts with 117 production custom elements, narrows them to 42 deterministic workloads, measures trusted browser timing and rendering work, evaluates scenario-specific and absolute budgets, and runs the work across four CI shards plus an application shell test. Below it, timing results are kept separate from paint results."
    interactive
  >
    <ol class="diagram-flow performance-flow">
      <li
        v-for="(stage, index) in stages"
        :key="stage.label"
        class="diagram-node"
        :class="{ 'performance-stage--active': activeStage === index }"
      >
        <button
          type="button"
          :aria-pressed="activeStage === index"
          :aria-label="`Inspect stage ${index + 1}: ${stage.label}`"
          @click="activeStage = index"
        >
          <span class="diagram-index">{{ String(index + 1).padStart(2, '0') }} / {{ stage.label }}</span>
          <span>
            <strong class="diagram-value">{{ stage.value }}</strong>
            <span class="diagram-label">{{ stage.summary }}</span>
          </span>
        </button>
      </li>
    </ol>

    <section class="performance-inspector" aria-live="polite" aria-label="Selected performance pipeline stage">
      <span class="diagram-index">Inspect / {{ selectedStage.label }}</span>
      <strong>{{ selectedStage.value }}</strong>
      <p>{{ selectedStage.detail }}</p>
    </section>

    <div class="performance-evidence">
      <div class="performance-evidence-tabs" role="group" aria-label="Choose performance evidence">
        <button
          v-for="(item, index) in evidence"
          :key="item.id"
          type="button"
          :aria-pressed="activeEvidence === index"
          @click="activeEvidence = index"
        >
          {{ item.label }}
        </button>
      </div>
      <section :aria-label="`${selectedEvidence.label} results`" aria-live="polite">
        <div>
          <p>{{ selectedEvidence.label }}</p>
          <span>{{ selectedEvidence.description }}</span>
        </div>
        <dl>
          <div v-for="metric in selectedEvidence.metrics" :key="metric[0]">
            <dt>{{ metric[0] }}</dt>
            <dd>{{ metric[1] }}</dd>
          </div>
        </dl>
      </section>
    </div>
  </ArticleFigure>
</template>

<style scoped>
.performance-flow .diagram-node {
  min-height: 10.5rem;
  padding: 0;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.performance-flow .diagram-node.performance-stage--active {
  border-color: var(--site-accent);
  background: var(--site-accent-soft);
}

.performance-flow .diagram-node button {
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

.performance-flow .diagram-node button:focus-visible {
  outline: 2px solid var(--site-accent);
  outline-offset: -4px;
}

.performance-inspector {
  display: grid;
  gap: 0.55rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--site-line-strong);
  background: var(--site-paper);
}

.performance-inspector > strong {
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.45rem);
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  line-height: 1;
}

.performance-inspector p {
  max-width: 42rem;
  margin: 0;
  color: var(--site-muted);
  font-size: 1rem;
  line-height: 1.55;
}

.performance-evidence {
  display: grid;
  gap: 0;
  margin-top: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--site-line);
}

.performance-evidence-tabs {
  display: flex;
}

.performance-evidence-tabs button {
  min-height: var(--site-control-size);
  flex: 1 1 0;
  padding: 0.65rem 0.8rem;
  border: 1px solid var(--site-line-strong);
  background: transparent;
  color: var(--site-muted);
  cursor: pointer;
  font-family: var(--site-font-display);
  font-size: 0.76rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  text-transform: uppercase;
}

.performance-evidence-tabs button + button {
  border-left: 0;
}

.performance-evidence-tabs button:hover,
.performance-evidence-tabs button:focus-visible,
.performance-evidence-tabs button[aria-pressed="true"] {
  background: var(--site-accent-soft);
  color: var(--site-accent);
}

.performance-evidence section {
  padding: 1rem;
  border: 1px solid var(--site-line);
  border-top: 0;
}

.performance-evidence section > div {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.performance-evidence p {
  margin: 0 0 1rem;
  color: var(--site-accent);
  font-family: var(--site-font-display);
  font-size: 0.76rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.065em;
  text-transform: uppercase;
}

.performance-evidence section > div p {
  margin: 0;
}

.performance-evidence section > div span {
  color: var(--site-muted);
  font-size: 0.76rem;
  line-height: 1.45;
}

.performance-evidence dl,
.performance-evidence dd {
  margin: 0;
}

.performance-evidence dl {
  display: grid;
  gap: 0.7rem;
}

.performance-evidence dl > div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.7rem;
  border-top: 1px solid var(--site-line);
}

.performance-evidence dt {
  color: var(--site-muted);
  font-size: 0.78rem;
}

.performance-evidence dd {
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  font-variant-numeric: tabular-nums;
}

@media (min-width: 48rem) {
  .performance-flow {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-flow: row;
    gap: 1rem;
  }

  .performance-flow .diagram-node::before,
  .performance-flow .diagram-node::after {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .performance-flow .diagram-node {
    transition: none;
  }
}

@media (max-width: 47.999rem) {
  .performance-flow {
    grid-template-columns: minmax(0, 1fr);
  }

  .performance-flow .diagram-node {
    min-height: 0;
  }
}
</style>
