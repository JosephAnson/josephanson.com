<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth?: number
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
}>()

const activeId = shallowRef(props.links[0]?.id ?? '')
let observer: IntersectionObserver | undefined

onMounted(() => {
  const headings = props.links
    .map(link => document.getElementById(link.id))
    .filter((heading): heading is HTMLElement => Boolean(heading))

  observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

    if (visible[0]?.target.id) {
      activeId.value = visible[0].target.id
    }
  }, {
    rootMargin: '-18% 0px -68%',
    threshold: [0, 1],
  })

  headings.forEach(heading => observer?.observe(heading))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div v-if="links.length >= 4" class="article-section-navigation">
    <details class="article-toc-mobile">
      <summary>
        <span>On this page</span>
        <span aria-hidden="true">{{ links.length.toString().padStart(2, '0') }}</span>
      </summary>
      <ol>
        <li v-for="(link, index) in links" :key="link.id">
          <a
            :href="`#${link.id}`"
            :aria-current="activeId === link.id ? 'location' : undefined"
            @click="activeId = link.id"
          >
            <span aria-hidden="true">{{ (index + 1).toString().padStart(2, '0') }}</span>
            {{ link.text }}
          </a>
        </li>
      </ol>
    </details>

    <nav class="article-toc-desktop" aria-label="On this page">
      <p>On this page</p>
      <ol>
        <li v-for="(link, index) in links" :key="link.id">
          <a
            :href="`#${link.id}`"
            :aria-current="activeId === link.id ? 'location' : undefined"
            @click="activeId = link.id"
          >
            <span aria-hidden="true">{{ (index + 1).toString().padStart(2, '0') }}</span>
            {{ link.text }}
          </a>
        </li>
      </ol>
    </nav>
  </div>
</template>

<style scoped>
.article-toc-mobile {
  border-block: 1px solid var(--site-line-strong);
}

.article-toc-mobile summary {
  min-height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--site-ink);
  cursor: pointer;
  font-family: var(--site-font-display);
  font-size: 0.72rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.06em;
  list-style: none;
  text-transform: uppercase;
}

.article-toc-mobile summary::-webkit-details-marker {
  display: none;
}

.article-toc-mobile summary span:last-child {
  color: var(--site-accent);
  font-variant-numeric: tabular-nums;
}

.article-toc-mobile ol,
.article-toc-desktop ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

.article-toc-mobile ol {
  padding-bottom: 0.75rem;
  border-top: 1px solid var(--site-line);
}

.article-toc-mobile a,
.article-toc-desktop a {
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  gap: 0.5rem;
  color: var(--site-muted);
  line-height: 1.35;
  text-decoration: none;
}

.article-toc-mobile a {
  min-height: 2.75rem;
  align-items: center;
  padding-block: 0.4rem;
  border-bottom: 1px solid var(--site-line);
  font-size: 0.8rem;
}

.article-toc-mobile li:last-child a {
  border-bottom: 0;
}

.article-toc-mobile a span,
.article-toc-desktop a span {
  color: var(--site-faint);
  font-family: var(--site-font-display);
  font-size: 0.62rem;
  font-variant-numeric: tabular-nums;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.04em;
}

.article-toc-mobile a:hover,
.article-toc-mobile a[aria-current="location"],
.article-toc-desktop a:hover,
.article-toc-desktop a[aria-current="location"] {
  color: var(--site-accent);
}

.article-toc-desktop {
  display: none;
}

@media (min-width: 72rem) {
  .article-section-navigation {
    position: sticky;
    top: calc(var(--site-header-height, 5.75rem) + 2rem);
    max-height: calc(100dvh - var(--site-header-height, 5.75rem) - 4rem);
    align-self: start;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .article-toc-mobile {
    display: none;
  }

  .article-toc-desktop {
    display: block;
    padding-top: 0.8rem;
    border-top: 1px solid var(--site-line-strong);
  }

  .article-toc-desktop > p {
    margin: 0 0 1.25rem;
    color: var(--site-accent);
    font-family: var(--site-font-display);
    font-size: 0.66rem;
    font-stretch: 78%;
    font-variation-settings: "wdth" 78, "wght" 560;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .article-toc-desktop ol {
    display: grid;
    gap: 0.8rem;
  }

  .article-toc-desktop a {
    font-size: 0.76rem;
  }
}

@media print {
  .article-section-navigation {
    display: none;
  }
}
</style>
