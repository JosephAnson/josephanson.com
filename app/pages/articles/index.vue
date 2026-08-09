<script setup lang="ts">
const {
  data: articles,
  error,
  status,
  refresh,
} = await useAsyncData('articles-index', () => queryCollection('articles').order('date', 'DESC').all())

useSeoMeta({
  title: 'Notes',
  description: 'Technical notes on frontend systems, TypeScript, Vue, validation, and the work around the work.',
})
</script>

<template>
  <div class="index-page quiet-arrival">
    <BasePageIntro
      index="02 / Notes"
      lead="Notes on frontend architecture, design systems, type safety, and ideas still being worked through."
    >
      Thinking, written down.
    </BasePageIntro>

    <BaseDataState
      v-if="error"
      kind="error"
      title="Notes couldn’t be loaded."
      description="The notes collection is temporarily unavailable. Try loading it again."
      action-label="Try again"
      :busy="status === 'pending'"
      @action="refresh"
    />
    <ArticleList v-else-if="articles?.length" :articles="articles" />
    <BaseDataState
      v-else
      kind="empty"
      title="No notes are published yet."
      description="There’s nothing in this collection right now. Check back another time."
    />
  </div>
</template>
