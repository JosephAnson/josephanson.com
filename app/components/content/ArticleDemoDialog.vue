<script setup lang="ts">
defineProps<{
  title: string
}>()

defineSlots<{
  trigger: (props: { open: () => void }) => unknown
  default: (props: { close: () => void }) => unknown
}>()

const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const trigger = shallowRef<HTMLElement>()
const titleId = `article-demo-dialog-${useId().replaceAll(':', '')}`

function open() {
  trigger.value = document.activeElement instanceof HTMLElement ? document.activeElement : undefined
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
}

function restoreFocus() {
  nextTick(() => trigger.value?.focus())
}
</script>

<template>
  <slot name="trigger" :open="open" />

  <dialog
    ref="dialog"
    class="article-demo-dialog"
    :aria-labelledby="titleId"
    @close="restoreFocus"
  >
    <header>
      <h3 :id="titleId">
        {{ title }}
      </h3>
      <button type="button" class="article-demo-text-button" @click="close">
        Close
      </button>
    </header>
    <div class="article-demo-dialog-body">
      <slot :close="close" />
    </div>
  </dialog>
</template>
