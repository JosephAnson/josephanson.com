<script setup lang="ts">
interface Article {
  _path: string
  title: string
  date: string
  description: string
  badges?: { bg: string, text: string, content: string }[]
}

const props = defineProps({
  article: {
    type: Object,
    required: true,
    validator: (value: Article) => {
      if (value?._path && value.title)
        return true
      return false
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
})

const id = computed(() => props.article?._id)
</script>

<template>
  <li>
    <NuxtLink
      :to="article._path"
      class="mb-2 block text-xl text-primary-500"
    >
      <article
        v-if="article._path && article.title"
        :data-content-id="id"
        class="flex flex-wrap items-center"
      >
        <h3>
          {{ article.title }}
        </h3>
        <time>
          {{ article.date }}
        </time>
      </article>
    </NuxtLink>
  </li>
</template>
