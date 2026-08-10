<template>
  <ArticleFigure
    marker="Migration trace"
    caption="The migration rule interprets intent, resolves competing utilities, and emits one equivalent expression."
    description="The input classes n-stack and n-gap-l are expanded into flex, flex-column, a default medium gap and an explicit large gap. The priority rules preserve the explicit large gap and remove the conflicting default medium gap, producing n:flex, n:flex-col and n:gap-l. A second flow connects Nord design tokens to the Tailwind theme, Nord-prefixed utilities and consuming products."
  >
    <ol class="diagram-flow migration-flow">
      <li class="diagram-node">
        <span class="diagram-index">01 / Input</span>
        <code class="diagram-code">n-stack n-gap-l</code>
      </li>
      <li class="diagram-node">
        <span class="diagram-index">02 / Expand</span>
        <code class="diagram-code">n:flex n:flex-col n:gap-m n:gap-l</code>
      </li>
      <li class="diagram-node">
        <span class="diagram-index">03 / Resolve</span>
        <span>
          <strong class="diagram-value">Explicit wins</strong>
          <span class="diagram-label">Remove the compound default</span>
        </span>
      </li>
      <li class="diagram-node migration-result">
        <span class="diagram-index">04 / Equivalent output</span>
        <code class="diagram-code">n:flex n:flex-col n:gap-l</code>
      </li>
    </ol>

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
}

.migration-result {
  border-color: var(--site-accent);
  background: var(--site-accent-soft);
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
  .migration-system {
    grid-template-columns: repeat(4, 1fr);
  }

  .migration-system li:not(:last-child) {
    border-right: 0;
    border-bottom: 1px solid var(--site-line);
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
