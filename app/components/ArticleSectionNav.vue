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
const mobileNavigation = useTemplateRef<HTMLDetailsElement>('mobileNavigation')
const readingProgress = shallowRef(0)
const progressPercent = computed(() => Math.round(readingProgress.value * 100))
const activeIndex = computed(() => Math.max(0, props.links.findIndex(link => link.id === activeId.value)))
let headings: HTMLElement[] = []
let articleBody: HTMLElement | null = null
let resizeObserver: ResizeObserver | undefined
let animationFrame: number | undefined

function updateReadingState() {
  animationFrame = undefined

  if (!articleBody)
    return

  const scrollTop = window.scrollY
  const viewportMarker = scrollTop + Math.min(window.innerHeight * 0.3, 220)
  const bodyTop = articleBody.getBoundingClientRect().top + scrollTop
  const bodyBottom = bodyTop + articleBody.offsetHeight
  const progressStart = bodyTop - window.innerHeight * 0.25
  const progressEnd = Math.max(progressStart + 1, bodyBottom - window.innerHeight * 0.7)

  readingProgress.value = Math.min(1, Math.max(0, (scrollTop - progressStart) / (progressEnd - progressStart)))

  for (const heading of headings) {
    const headingTop = heading.getBoundingClientRect().top + scrollTop

    if (headingTop <= viewportMarker)
      activeId.value = heading.id
    else
      break
  }
}

function queueReadingStateUpdate() {
  if (animationFrame !== undefined)
    return

  animationFrame = window.requestAnimationFrame(updateReadingState)
}

function selectSection(id: string, closeMobileNavigation = false) {
  activeId.value = id

  if (closeMobileNavigation)
    mobileNavigation.value?.removeAttribute('open')
}

onMounted(() => {
  headings = props.links
    .map(link => document.getElementById(link.id))
    .filter((heading): heading is HTMLElement => Boolean(heading))
  articleBody = document.querySelector<HTMLElement>('.article-body')
  resizeObserver = new ResizeObserver(queueReadingStateUpdate)

  if (articleBody)
    resizeObserver.observe(articleBody)

  window.addEventListener('scroll', queueReadingStateUpdate, { passive: true })
  window.addEventListener('resize', queueReadingStateUpdate)
  updateReadingState()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', queueReadingStateUpdate)
  window.removeEventListener('resize', queueReadingStateUpdate)
  resizeObserver?.disconnect()

  if (animationFrame !== undefined)
    window.cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div
    class="article-reading-progress"
    role="progressbar"
    aria-label="Article reading progress"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="progressPercent"
  >
    <span :style="{ transform: `scaleX(${readingProgress})` }" />
  </div>

  <div v-if="links.length >= 4" class="article-section-navigation">
    <details ref="mobileNavigation" class="article-toc-mobile">
      <summary>
        <span>On this page</span>
        <span aria-hidden="true">
          {{ (activeIndex + 1).toString().padStart(2, '0') }} / {{ links.length.toString().padStart(2, '0') }}
        </span>
      </summary>
      <span class="article-toc-progress" aria-hidden="true">
        <span :style="{ transform: `scaleX(${readingProgress})` }" />
      </span>
      <ol>
        <li v-for="(link, index) in links" :key="link.id">
          <a
            :href="`#${link.id}`"
            :aria-current="activeId === link.id ? 'location' : undefined"
            @click="selectSection(link.id, true)"
          >
            <span aria-hidden="true">{{ (index + 1).toString().padStart(2, '0') }}</span>
            {{ link.text }}
          </a>
        </li>
      </ol>
    </details>

    <nav class="article-toc-desktop" aria-label="On this page">
      <div class="article-toc-heading">
        <p>On this page</p>
        <span>{{ progressPercent }}%</span>
      </div>
      <span class="article-toc-progress" aria-hidden="true">
        <span :style="{ transform: `scaleX(${readingProgress})` }" />
      </span>
      <ol>
        <li v-for="(link, index) in links" :key="link.id">
          <a
            :href="`#${link.id}`"
            :aria-current="activeId === link.id ? 'location' : undefined"
            @click="selectSection(link.id)"
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
.article-reading-progress {
  position: fixed;
  z-index: 80;
  top: 0;
  right: 0;
  left: 0;
  height: 2px;
  overflow: hidden;
  background: transparent;
  pointer-events: none;
}

.article-reading-progress > span,
.article-toc-progress > span {
  width: 100%;
  height: 100%;
  display: block;
  background: var(--site-accent);
  transform-origin: left;
  transition: transform 100ms linear;
}

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
  font-size: 0.76rem;
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

.article-toc-progress {
  height: 1px;
  display: block;
  overflow: hidden;
  background: var(--site-line);
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
  font-size: 0.76rem;
}

.article-toc-mobile li:last-child a {
  border-bottom: 0;
}

.article-toc-mobile a span,
.article-toc-desktop a span {
  color: var(--site-faint);
  font-family: var(--site-font-display);
  font-size: 0.76rem;
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

  .article-toc-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }

  .article-toc-heading p {
    margin: 0;
    color: var(--site-accent);
    font-family: var(--site-font-display);
    font-size: 0.76rem;
    font-stretch: 78%;
    font-variation-settings: "wdth" 78, "wght" 560;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .article-toc-heading span {
    color: var(--site-muted);
    font-family: var(--site-font-display);
    font-size: 0.76rem;
    font-variant-numeric: tabular-nums;
  }

  .article-toc-desktop > .article-toc-progress {
    margin-block: 0.8rem 1.25rem;
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
  .article-reading-progress,
  .article-section-navigation {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .article-reading-progress > span,
  .article-toc-progress > span {
    transition: none;
  }
}
</style>
