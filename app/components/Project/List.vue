<script setup lang="ts">
import type { Collections } from '@nuxt/content'

type WorkGridSpan = 'standard' | 'wide' | 'full'

const props = defineProps<{
  projects: Collections['projects'][]
  headingLevel?: 'h2' | 'h3'
}>()

function createSpanPlan(count: number): WorkGridSpan[] {
  if (count <= 0)
    return []

  if (count === 1)
    return ['full']

  const validPairRows = Array.from({ length: Math.floor(count / 2) + 1 }, (_, index) => index)
    .filter(pairRows => (count - pairRows * 2) % 3 === 0)
  const targetPairRows = count / 6
  const pairRows = validPairRows.reduce((closest, candidate) => (
    Math.abs(candidate - targetPairRows) < Math.abs(closest - targetPairRows)
      ? candidate
      : closest
  ))
  let trioRows = (count - pairRows * 2) / 3
  const spans: WorkGridSpan[] = []

  for (let pairIndex = 0; pairIndex < pairRows; pairIndex++) {
    spans.push(...(pairIndex % 2 === 0
      ? ['wide', 'standard'] as const
      : ['standard', 'wide'] as const))

    if (trioRows > 0) {
      spans.push('standard', 'standard', 'standard')
      trioRows--
    }
  }

  while (trioRows > 0) {
    spans.push('standard', 'standard', 'standard')
    trioRows--
  }

  return spans
}

const spanPlan = computed(() => createSpanPlan(props.projects.length))
</script>

<template>
  <ul class="work-grid">
    <li
      v-for="(project, index) in projects"
      :key="project.id"
      :class="`work-grid-item--${spanPlan[index] ?? 'standard'}`"
    >
      <ProjectItem :project="project" :heading-level="headingLevel" />
    </li>
  </ul>
</template>
