<template>
  <ArticleFigure
    marker="Distribution model"
    caption="One versioned source can serve guided reading, discovery, and bounded retrieval without creating a second set of documentation."
    description="A single versioned source of Markdown, component metadata, examples, and source code feeds three interfaces. The website provides guided reading for people. llms.txt provides a discovery map for coding agents. MCP provides bounded retrieval for coding agents. Every interface points back to the same revision."
  >
    <div class="documentation-source">
      <span class="diagram-index">Canonical source / one revision</span>
      <strong>Markdown · metadata · examples · source</strong>
    </div>

    <ol class="documentation-interfaces">
      <li>
        <span class="diagram-index">01 / Website</span>
        <strong>Guided reading</strong>
        <span>Navigation, examples and visual hierarchy</span>
        <small>People</small>
      </li>
      <li>
        <span class="diagram-index">02 / llms.txt</span>
        <strong>Discovery map</strong>
        <span>Canonical routes and concise orientation</span>
        <small>Coding agents</small>
      </li>
      <li>
        <span class="diagram-index">03 / MCP</span>
        <strong>Bounded retrieval</strong>
        <span>Typed questions with narrow, current answers</span>
        <small>Coding agents</small>
      </li>
    </ol>

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
  font-size: clamp(1.1rem, 3vw, 1.55rem);
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
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid var(--site-line);
}

.documentation-interfaces li:last-child {
  border-bottom: 0;
}

.documentation-interfaces strong {
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-size: 1.25rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  line-height: 1;
}

.documentation-interfaces span:not(.diagram-index) {
  color: var(--site-muted);
  font-size: 0.8rem;
  line-height: 1.45;
}

.documentation-interfaces small {
  width: fit-content;
  padding-top: 0.6rem;
  border-top: 1px solid var(--site-line);
  color: var(--site-accent);
  font-family: var(--site-font-display);
  font-size: 0.66rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.06em;
  text-transform: uppercase;
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
</style>
