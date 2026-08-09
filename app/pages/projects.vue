<script setup lang="ts">
const {
  data: projects,
  error,
  status,
  refresh,
} = await useAsyncData('projects-index', () => queryCollection('projects').order('date', 'DESC').all())

useSeoMeta({
  title: 'Work',
  description: 'Selected products, client work, systems, and small web experiments by Joseph Anson.',
})
</script>

<template>
  <div class="index-page quiet-arrival">
    <BasePageIntro
      index="01 / Work"
      lead="Products, systems, client work, and a few tools made simply because they ought to exist."
    >
      Useful things for the web.
    </BasePageIntro>

    <BaseDataState
      v-if="error"
      kind="error"
      title="Work couldn’t be loaded."
      description="The project list is temporarily unavailable. Try loading it again."
      action-label="Try again"
      :busy="status === 'pending'"
      @action="refresh"
    />
    <ProjectList v-else-if="projects?.length" :projects="projects" />
    <BaseDataState
      v-else
      kind="empty"
      title="No projects are listed yet."
      description="This collection is being prepared. The rest of the site is still available."
    />
  </div>
</template>
