<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  caption: string
  href?: string
}>()
</script>

<template>
  <figure class="article-screenshot not-prose">
    <a
      v-if="href"
      class="article-screenshot-link"
      :href="href"
      target="_blank"
      rel="noreferrer"
    >
      <img
        class="article-screenshot-image"
        :src="src"
        :alt="alt"
        loading="lazy"
        decoding="async"
      >
    </a>
    <img
      v-else
      class="article-screenshot-image"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
    >
    <figcaption class="article-screenshot-caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.article-screenshot {
  width: 100%;
  margin: clamp(3.5rem, 8vw, 6rem) 0;
  border-block: 1px solid var(--site-line-strong);
  background: color-mix(in srgb, var(--site-panel) 84%, transparent);
}

.article-screenshot-link {
  display: block;
  padding: clamp(0.5rem, 2vw, 0.9rem);
  color: inherit;
}

.article-screenshot-image {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid var(--site-line);
  background: #fff;
}

.article-screenshot-link:hover .article-screenshot-image {
  border-color: var(--site-accent);
}

.article-screenshot-link:focus-visible {
  outline: 2px solid var(--site-focus);
  outline-offset: 3px;
}

.article-screenshot-caption {
  margin: 0;
  padding: 1rem clamp(1rem, 3vw, 1.5rem) 1.15rem;
  border-top: 1px solid var(--site-line);
  color: var(--site-muted);
  font-size: 0.84rem;
  line-height: 1.55;
}

@media print {
  .article-screenshot {
    break-inside: avoid;
    background: transparent;
  }
}
</style>
