<template>
  <ArticleFigure
    marker="Capability path"
    caption="The primitive owns the state transition; wrappers pass the capability through; scoped content receives only the operation for its own instance."
    description="A three-stage flow starts at Reka UI Dialog Root, where state is owned and close sets that state to false. Nuxt UI Modal and Slideover then pass the capability through their scoped slots. Consumer content receives a local close function. In nested usage, closeFirst belongs only to the first modal and closeSecond belongs only to the second modal."
  >
    <ol class="diagram-flow close-flow">
      <li class="diagram-node">
        <span class="diagram-index">01 / Primitive</span>
        <span>
          <strong class="diagram-value">Reka UI</strong>
          <span class="diagram-label">Dialog Root owns the open state</span>
        </span>
        <code class="diagram-code">close() → open = false</code>
      </li>
      <li class="diagram-node">
        <span class="diagram-index">02 / Wrapper</span>
        <span>
          <strong class="diagram-value">Nuxt UI</strong>
          <span class="diagram-label">Modal and Slideover pass it through</span>
        </span>
        <code class="diagram-code">#footer="{ close }"</code>
      </li>
      <li class="diagram-node">
        <span class="diagram-index">03 / Consumer</span>
        <span>
          <strong class="diagram-value">Scoped content</strong>
          <span class="diagram-label">Requests a transition without owning state</span>
        </span>
        <code class="diagram-code">@click="close"</code>
      </li>
    </ol>

    <div class="close-instances" aria-label="Nested modal ownership">
      <p><span>Modal 01</span><code>closeFirst()</code></p>
      <p><span>Modal 02</span><code>closeSecond()</code></p>
    </div>
  </ArticleFigure>
</template>

<style scoped>
.close-flow {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.close-flow .diagram-node {
  min-height: 12rem;
}

.close-instances {
  display: grid;
  gap: 0;
  margin-top: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--site-line);
}

.close-instances p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
  padding: 0.9rem 1rem;
  border: 1px solid var(--site-line);
}

.close-instances p + p {
  border-top: 0;
}

.close-instances span {
  color: var(--site-muted);
  font-size: 0.78rem;
}

.close-instances code {
  color: var(--site-accent);
  font-size: 0.78rem;
}

@media (min-width: 40rem) {
  .close-instances {
    grid-template-columns: 1fr 1fr;
  }

  .close-instances p + p {
    border-top: 1px solid var(--site-line);
    border-left: 0;
  }
}

@media (max-width: 47.999rem) {
  .close-flow {
    grid-template-columns: minmax(0, 1fr);
  }

  .close-flow .diagram-node {
    min-height: 0;
  }
}
</style>
