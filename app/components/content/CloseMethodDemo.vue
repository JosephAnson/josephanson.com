<script setup lang="ts">
const externallyOpen = shallowRef(false)
const externalDialog = useTemplateRef<HTMLDialogElement>('externalDialog')
const externalTrigger = useTemplateRef<HTMLButtonElement>('externalTrigger')

watch(externallyOpen, (open) => {
  if (open && !externalDialog.value?.open) {
    externalDialog.value?.showModal()
  }
  else if (!open && externalDialog.value?.open) {
    externalDialog.value.close()
  }
})

function closeExternal() {
  externallyOpen.value = false
}

function syncExternalState() {
  externallyOpen.value = false
  nextTick(() => externalTrigger.value?.focus())
}
</script>

<template>
  <ArticleFigure
    marker="Live comparison"
    caption="Both examples are accessible native dialogs. The second changes the ownership boundary: content receives a local close operation instead of mutating state owned by the article."
    description="An interactive comparison presents two dialog launchers. The first requires the consumer to create and mutate an external open-state reference. The second exposes a close function to the dialog content through a scoped slot. Escape, the close controls, and focus restoration work in both examples."
    interactive
  >
    <div class="close-demo-grid">
      <section>
        <p class="diagram-index">
          Before / external state
        </p>
        <h3>Consumer owns a ref</h3>
        <p>The article opens the surface and later sets the same state back to false.</p>
        <button
          ref="externalTrigger"
          type="button"
          class="article-demo-button"
          @click="externallyOpen = true"
        >
          Open controlled dialog
        </button>
      </section>

      <section>
        <p class="diagram-index">
          After / scoped operation
        </p>
        <h3>Content receives close()</h3>
        <p>The dialog keeps its state path and exposes only the operation this subtree needs.</p>
        <ArticleDemoDialog title="Scoped close() example">
          <template #trigger="{ open }">
            <button type="button" class="article-demo-button" @click="open">
              Open scoped dialog
            </button>
          </template>
          <template #default="{ close }">
            <p>This button calls the function provided by this dialog instance.</p>
            <button type="button" class="article-demo-button" @click="close">
              Run close()
            </button>
          </template>
        </ArticleDemoDialog>
      </section>
    </div>

    <dialog
      ref="externalDialog"
      class="article-demo-dialog"
      aria-labelledby="external-dialog-title"
      @close="syncExternalState"
    >
      <header>
        <h3 id="external-dialog-title">
          External state example
        </h3>
        <button type="button" class="article-demo-text-button" @click="closeExternal">
          Close
        </button>
      </header>
      <div class="article-demo-dialog-body">
        <p>This button mutates the state reference created outside the dialog.</p>
        <button type="button" class="article-demo-button" @click="closeExternal">
          Set open to false
        </button>
      </div>
    </dialog>
  </ArticleFigure>
</template>

<style scoped>
.close-demo-grid {
  display: grid;
  gap: 1px;
  border: 1px solid var(--site-line-strong);
  background: var(--site-line);
}

.close-demo-grid > section {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(1rem, 3vw, 1.5rem);
  background: var(--site-paper);
}

.close-demo-grid h3 {
  margin: 0.7rem 0;
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-size: clamp(1.35rem, 3vw, 1.8rem);
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  line-height: 1;
}

.close-demo-grid p:not(.diagram-index) {
  flex: 1;
  margin: 0 0 1.5rem;
  color: var(--site-muted);
  font-size: 0.84rem;
  line-height: 1.55;
}

.article-demo-button,
:global(.article-demo-button) {
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--site-line-strong);
  border-radius: 0;
  background: transparent;
  color: var(--site-ink);
  cursor: pointer;
  font-size: 0.78rem;
}

.article-demo-button:hover,
:global(.article-demo-button:hover) {
  border-color: var(--site-accent);
  background: var(--site-accent-soft);
  color: var(--site-accent);
}

@media (min-width: 40rem) {
  .close-demo-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

<style>
.article-demo-dialog {
  width: min(32rem, calc(100vw - 2rem));
  padding: 0;
  border: 1px solid var(--site-accent);
  border-radius: 0;
  background: var(--site-paper);
  color: var(--site-ink);
}

.article-demo-dialog::backdrop {
  background: rgb(10 14 18 / 64%);
}

.article-demo-dialog > header {
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-inline: 1rem;
  border-bottom: 1px solid var(--site-line);
}

.article-demo-dialog h3 {
  margin: 0;
  color: var(--site-ink);
  font-family: var(--site-font-display);
  font-size: 1rem;
  font-stretch: 78%;
  font-variation-settings: "wdth" 78, "wght" 560;
  line-height: 1;
}

.article-demo-text-button {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--site-accent);
  cursor: pointer;
  font-size: 0.76rem;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.article-demo-dialog-body {
  padding: 1.25rem;
}

.article-demo-dialog-body p {
  margin: 0 0 1.25rem;
  color: var(--site-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (prefers-reduced-motion: reduce) {
  .article-demo-dialog::backdrop {
    animation: none;
  }
}
</style>
