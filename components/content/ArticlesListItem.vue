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
  <article
    v-if="article._path && article.title"
    :data-content-id="id"
  >
    <div v-if="article.cover" class="aspect-w-16 aspect-h-9 w-full rounded-md object-cover">
      <NuxtLink :to="article._path">
        <NuxtImg
          :src="article.cover"
          :alt="article.title"
          width="16"
          height="9"
        />
      </NuxtLink>
    </div>

    <div>
      <NuxtLink
        :to="article._path"
        class="mb-2 block text-2xl"
        :class="{ 'text-4xl leading-tight': featured }"
      >
        <h3>
          {{ article.title }}
        </h3>
      </NuxtLink>

      <p class="mb-4 leading-snug" :class="{ 'line-clamp-4': featured, 'line-clamp-2': !featured }">
        {{ article.description }}
      </p>
      <time class="text-sm text-gray-500 dark:text-gray-500">
        {{ article.date }}
      </time>
    </div>
  </article>
</template>
