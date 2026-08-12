<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = withDefaults(defineProps<{
  articles: Collections['articles'][]
  headingLevel?: 'h2' | 'h3'
  filterable?: boolean
}>(), {
  headingLevel: 'h2',
  filterable: false,
})

const activeCategory = shallowRef('')

const categories = computed(() => {
  const counts = new Map<string, number>()

  for (const article of props.articles) {
    for (const category of article.categories ?? [])
      counts.set(category, (counts.get(category) ?? 0) + 1)
  }

  return [...counts.entries()]
    .filter(([label, count]) => count > 1 || label === 'AI')
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, count]) => ({ label, count }))
})

const filteredArticles = computed(() => {
  if (!activeCategory.value)
    return props.articles

  return props.articles.filter(article => article.categories?.includes(activeCategory.value))
})
</script>

<template>
  <div v-if="articles?.length && filterable" class="article-list">
    <section v-if="categories.length" class="notes-explorer" aria-labelledby="notes-category-title">
      <div class="notes-explorer-heading">
        <h2 id="notes-category-title">
          Categories
        </h2>
        <p aria-live="polite">
          {{ filteredArticles.length }} {{ filteredArticles.length === 1 ? 'note' : 'notes' }}
        </p>
      </div>

      <div class="notes-filter" role="group" aria-label="Filter notes by category">
        <button
          type="button"
          :aria-pressed="activeCategory === ''"
          aria-controls="article-list"
          @click="activeCategory = ''"
        >
          <span>All</span>
          <span aria-hidden="true">{{ articles.length.toString().padStart(2, '0') }}</span>
        </button>
        <button
          v-for="category in categories"
          :key="category.label"
          type="button"
          :aria-pressed="activeCategory === category.label"
          aria-controls="article-list"
          @click="activeCategory = category.label"
        >
          <span>{{ category.label }}</span>
          <span aria-hidden="true">{{ category.count.toString().padStart(2, '0') }}</span>
        </button>
      </div>
    </section>

    <TransitionGroup id="article-list" name="notes-filter" tag="ul" class="notes-list">
      <ArticleItem
        v-for="article in filteredArticles"
        :key="article.id"
        :article="article"
        :heading-level="headingLevel"
      />
    </TransitionGroup>
  </div>

  <ul v-else-if="articles?.length" class="notes-list">
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
      :heading-level="headingLevel"
    />
  </ul>
</template>

<style scoped>
.notes-explorer {
  display: grid;
  gap: 1rem;
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
  padding-block: 1rem;
  border-block: 1px solid var(--site-line-strong);
}

.notes-explorer-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.notes-explorer-heading h2,
.notes-explorer-heading p {
  margin: 0;
  font-family: var(--site-font-display);
  font-size: 0.76rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.notes-explorer-heading h2 {
  color: var(--site-ink);
}

.notes-explorer-heading p {
  color: var(--site-muted);
  font-variant-numeric: tabular-nums;
}

.notes-filter {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: 0.5rem;
}

.notes-filter button {
  min-width: 0;
  min-height: var(--site-control-size);
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--site-line);
  background: transparent;
  color: var(--site-muted);
  cursor: pointer;
  font-family: var(--site-font-display);
  font-size: 0.76rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: background-color 160ms ease, color 160ms ease;
}

.notes-filter button:hover,
.notes-filter button:focus-visible,
.notes-filter button[aria-pressed="true"] {
  background: var(--site-accent-soft);
  color: var(--site-accent);
}

.notes-filter button span:last-child {
  color: var(--site-faint);
  font-variant-numeric: tabular-nums;
}

.notes-filter-enter-active,
.notes-filter-leave-active {
  transition: opacity 180ms ease, transform 240ms var(--motion-ease-out);
}

.notes-filter-enter-from,
.notes-filter-leave-to {
  opacity: 0;
  transform: translateY(0.55rem);
}

@media (prefers-reduced-motion: reduce) {
  .notes-filter button,
  .notes-filter-enter-active,
  .notes-filter-leave-active {
    transition: none;
  }
}

@media print {
  .notes-explorer {
    display: none;
  }
}
</style>
