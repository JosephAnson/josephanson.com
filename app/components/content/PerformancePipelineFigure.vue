<template>
  <ArticleFigure
    marker="Performance contract"
    caption="The component suite turns a complete inventory into reviewed interaction and rendering budgets."
    description="A five-stage pipeline starts with 117 production custom elements, narrows them to 42 deterministic workloads, measures trusted browser timing and rendering work, evaluates scenario-specific and absolute budgets, and runs the work across four CI shards plus an application shell test. Below it, timing results are kept separate from paint results."
  >
    <ol class="diagram-flow performance-flow">
      <li class="diagram-node">
        <span class="diagram-index">01 / Inventory</span>
        <span>
          <strong class="diagram-value">117</strong>
          <span class="diagram-label">production custom elements classified</span>
        </span>
      </li>
      <li class="diagram-node">
        <span class="diagram-index">02 / Workloads</span>
        <span>
          <strong class="diagram-value">42</strong>
          <span class="diagram-label">trusted, deterministic scenarios</span>
        </span>
      </li>
      <li class="diagram-node">
        <span class="diagram-index">03 / Measure</span>
        <span>
          <strong class="diagram-value">Input → paint</strong>
          <span class="diagram-label">Event Timing, layout and rendering traces</span>
        </span>
      </li>
      <li class="diagram-node">
        <span class="diagram-index">04 / Contract</span>
        <span>
          <strong class="diagram-value">p75 + ceiling</strong>
          <span class="diagram-label">reviewed per-scenario limits</span>
        </span>
      </li>
      <li class="diagram-node">
        <span class="diagram-index">05 / CI</span>
        <span>
          <strong class="diagram-value">4 + 1</strong>
          <span class="diagram-label">component shards and App Shell</span>
        </span>
      </li>
    </ol>

    <div class="performance-evidence">
      <section aria-label="Interaction timing results">
        <p>Interaction timing</p>
        <dl>
          <div><dt>Within 32ms</dt><dd>37 / 42</dd></div>
          <div><dt>Dense Combobox</dt><dd>64ms</dd></div>
          <div><dt>App Shell</dt><dd>56ms</dd></div>
        </dl>
      </section>
      <section aria-label="Rendering work results">
        <p>Rendering work</p>
        <dl>
          <div><dt>Painted area</dt><dd>7.6× viewport</dd></div>
          <div><dt>Full paints</dt><dd>1</dd></div>
        </dl>
      </section>
    </div>
  </ArticleFigure>
</template>

<style scoped>
.performance-flow .diagram-node {
  min-height: 10.5rem;
}

.performance-evidence {
  display: grid;
  gap: 1rem;
  margin-top: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--site-line);
}

.performance-evidence section {
  padding: 1rem;
  border: 1px solid var(--site-line);
}

.performance-evidence p {
  margin: 0 0 1rem;
  color: var(--site-accent);
  font-family: var(--site-font-display);
  font-size: 0.68rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.065em;
  text-transform: uppercase;
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

@media (min-width: 40rem) {
  .performance-evidence {
    grid-template-columns: 3fr 2fr;
  }
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

@media (max-width: 47.999rem) {
  .performance-flow {
    grid-template-columns: minmax(0, 1fr);
  }

  .performance-flow .diagram-node {
    min-height: 0;
  }
}
</style>
