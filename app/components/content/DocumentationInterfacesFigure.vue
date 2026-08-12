<script setup lang="ts">
const interfaces = [
  {
    name: 'Website',
    job: 'Guided reading',
    output: 'Navigation, examples and visual hierarchy',
    audience: 'People',
    action: 'Browse the documentation in context',
  },
  {
    name: 'llms.txt',
    job: 'Discovery map',
    output: 'Canonical routes and concise orientation',
    audience: 'Coding agents',
    action: 'Discover the right canonical page',
  },
  {
    name: 'MCP',
    job: 'Bounded retrieval',
    output: 'Typed questions with narrow, current answers',
    audience: 'Coding agents',
    action: 'Retrieve one scoped answer',
  },
] as const

const activeInterface = shallowRef(0)
const selectedInterface = computed(() => interfaces[activeInterface.value]!)
</script>

<template>
  <ArticleFigure
    marker="Distribution model"
    caption="One versioned source can serve guided reading, discovery, and bounded retrieval without creating a second set of documentation."
    description="A single versioned source of Markdown, component metadata, examples, and source code feeds three interfaces. The website provides guided reading for people. llms.txt provides a discovery map for coding agents. MCP provides bounded retrieval for coding agents. Every interface points back to the same revision."
    interactive
  >
    <div class="documentation-source">
      <span class="diagram-index">Canonical source / one revision</span>
      <strong>Markdown · metadata · examples · source</strong>
    </div>

    <ol class="documentation-interfaces">
      <li
        v-for="(item, index) in interfaces"
        :key="item.name"
        :class="{ 'documentation-interface--active': activeInterface === index }"
      >
        <button
          type="button"
          :aria-pressed="activeInterface === index"
          :aria-label="`Inspect the ${item.name} interface`"
          @click="activeInterface = index"
        >
          <span class="diagram-index">{{ String(index + 1).padStart(2, '0') }} / {{ item.name }}</span>
          <strong>{{ item.job }}</strong>
          <span>{{ item.output }}</span>
          <small>{{ item.audience }}</small>
        </button>
      </li>
    </ol>

    <section class="documentation-inspector" aria-live="polite" aria-label="Selected documentation interface">
      <p class="documentation-inspector-label">
        Route through / {{ selectedInterface.name }}
      </p>
      <p class="documentation-inspector-action">
        {{ selectedInterface.action }}
      </p>
      <dl>
        <div>
          <dt>For</dt>
          <dd>{{ selectedInterface.audience }}</dd>
        </div>
        <div>
          <dt>Job</dt>
          <dd>{{ selectedInterface.job }}</dd>
        </div>
        <div>
          <dt>Returns</dt>
          <dd>{{ selectedInterface.output }}</dd>
        </div>
      </dl>
    </section>

    <p class="documentation-version">
      <span aria-hidden="true" />
      Every answer retains the source version
    </p>
  </ArticleFigure>
</template>

<style scoped>
.documentation-source {
  position: relative;
  display: grid;
  gap: 0.7rem;
  padding: 1.1rem;
  border: 1px solid var(--site-accent);
  background: var(--site-accent-soft);
}

.documentation-source::after {
  position: absolute;
  bottom: -1.8rem;
  left: 50%;
  width: 1px;
  height: 1.8rem;
  background: var(--site-accent);
  content: "";
}

.documentation-source strong {
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.45rem);
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  line-height: 1.05;
}

.documentation-interfaces {
  display: grid;
  gap: 0;
  margin: 1.8rem 0 0;
  padding: 0;
  border: 1px solid var(--site-line-strong);
  list-style: none;
}

.documentation-interfaces li {
  min-width: 0;
  border-bottom: 1px solid var(--site-line);
  transition: background-color 180ms ease;
}

.documentation-interfaces li:last-child {
  border-bottom: 0;
}

.documentation-interfaces li.documentation-interface--active {
  background: var(--site-accent-soft);
}

.documentation-interfaces button {
  width: 100%;
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 0.75rem;
  padding: 1rem;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
}

.documentation-interfaces button:focus-visible {
  outline: 2px solid var(--site-accent);
  outline-offset: -4px;
}

.documentation-interfaces strong {
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.45rem);
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  line-height: 1;
}

.documentation-interfaces button > span:not(.diagram-index) {
  color: var(--site-muted);
  font-size: 1rem;
  line-height: 1.45;
}

.documentation-interfaces small {
  width: fit-content;
  padding-top: 0.6rem;
  border-top: 1px solid var(--site-line);
  color: var(--site-accent);
  font-family: var(--site-font-display);
  font-size: 0.76rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.documentation-inspector {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--site-line-strong);
  background: var(--site-paper);
}

.documentation-inspector-label {
  margin: 0;
  color: var(--site-accent);
  font-family: var(--site-font-display);
  font-size: 0.76rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

.documentation-inspector-action {
  margin: 0;
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.45rem);
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  line-height: 1;
}

.documentation-inspector dl {
  display: grid;
  gap: 0;
  margin: 0;
  border-top: 1px solid var(--site-line);
}

.documentation-inspector dl > div {
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr);
  gap: 1rem;
  padding-block: 0.65rem;
  border-bottom: 1px solid var(--site-line);
}

.documentation-inspector dt,
.documentation-inspector dd {
  margin: 0;
  font-size: 0.76rem;
  line-height: 1.45;
}

.documentation-inspector dt {
  color: var(--site-faint);
  text-transform: uppercase;
}

.documentation-inspector dd {
  color: var(--site-muted);
}

.documentation-version {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 1rem 0 0;
  color: var(--site-muted);
  font-size: 0.76rem;
}

.documentation-version span {
  width: 0.45rem;
  height: 0.45rem;
  flex: 0 0 auto;
  border: 1px solid var(--site-accent);
  transform: rotate(45deg);
}

@media (min-width: 40rem) {
  .documentation-interfaces {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .documentation-interfaces li {
    border-right: 1px solid var(--site-line);
    border-bottom: 0;
  }

  .documentation-interfaces li:last-child {
    border-right: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .documentation-interfaces li {
    transition: none;
  }
}
</style>
