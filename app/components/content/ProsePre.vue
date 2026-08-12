<script setup lang="ts">
const props = withDefaults(defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>(), {
  code: '',
  language: null,
  filename: null,
  highlights: () => [],
  meta: null,
  class: null,
})

type CopyState = 'idle' | 'copied' | 'error'

const copyState = shallowRef<CopyState>('idle')
let resetTimer: number | undefined

const codeLabel = computed(() => props.filename || props.language || 'Code')
const copyLabel = computed(() => {
  if (copyState.value === 'copied')
    return 'Copied'

  if (copyState.value === 'error')
    return 'Copy failed'

  return 'Copy code'
})

async function copyCode() {
  window.clearTimeout(resetTimer)

  try {
    await navigator.clipboard.writeText(props.code)
    copyState.value = 'copied'
  }
  catch {
    copyState.value = 'error'
  }

  resetTimer = window.setTimeout(() => {
    copyState.value = 'idle'
  }, 1800)
}

onBeforeUnmount(() => window.clearTimeout(resetTimer))
</script>

<template>
  <div class="prose-code-block">
    <div class="prose-code-toolbar">
      <span>{{ codeLabel }}</span>
      <button type="button" :data-state="copyState" @click="copyCode">
        <span
          :class="copyState === 'copied' ? 'i-ph:check h-4 w-4' : 'i-ph:copy h-4 w-4'"
          aria-hidden="true"
        />
        <span aria-live="polite">{{ copyLabel }}</span>
      </button>
    </div>
    <pre
      :class="props.class"
      tabindex="0"
      :aria-label="`Scrollable code block${filename ? `: ${filename}` : ''}`"
    ><slot /></pre>
  </div>
</template>

<style>
pre code .line {
  display: block;
}

.prose-code-block {
  margin: 0 0 1.5rem;
}

.prose-code-toolbar {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-inline: 0.85rem;
  border: 1px solid var(--site-line);
  border-bottom: 0;
  background: var(--site-panel);
  color: var(--site-muted);
  font-family: var(--site-font-display);
  font-size: 0.76rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.prose-code-toolbar button {
  min-height: 2.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding-inline: 0.2rem;
  border: 0;
  background: transparent;
  color: var(--site-muted);
  cursor: pointer;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  transition: color 150ms ease;
}

.prose-code-toolbar button:hover,
.prose-code-toolbar button:focus-visible,
.prose-code-toolbar button[data-state="copied"] {
  color: var(--site-accent);
}

.prose-code-block pre {
  margin: 0 !important;
}

@media print {
  .prose-code-toolbar {
    display: none;
  }

  .prose-code-block pre {
    border-top: 1px solid var(--site-line);
  }
}
</style>
