<script setup lang="ts">
const {
  data: talks,
  error,
  status,
  refresh,
} = await useAsyncData('talks-index', () => queryCollection('talks').order('date', 'DESC').all())

useSeoMeta({
  title: 'Talks',
  description: 'Conference talks and practical sessions by Joseph Anson on TypeScript, validation, and resilient frontend systems.',
})
</script>

<template>
  <div class="index-page quiet-arrival">
    <BasePageIntro
      index="03 / Talks"
      lead="Sessions about building more reliable applications, usually with types, runtime data, and real production constraints."
    >
      Ideas,<br>
      out loud.
    </BasePageIntro>

    <BaseDataState
      v-if="error"
      kind="error"
      title="Talks couldn’t be loaded."
      description="The talk archive is temporarily unavailable. Try loading it again."
      action-label="Try again"
      :busy="status === 'pending'"
      @action="refresh"
    />
    <TalkList v-else-if="talks?.length" :talks="talks" />
    <BaseDataState
      v-else
      kind="empty"
      title="No talks are listed yet."
      description="There’s nothing in this archive right now. Check back another time."
    />
  </div>
</template>
