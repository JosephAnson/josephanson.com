<script lang="ts" setup>
const emits = defineEmits(['linkClick'])

const { navigation } = useContent()

function handleClick() {
  emits('linkClick')
}
</script>

<template>
  <nav>
    <ul class="w-full flex flex-col justify-center sm:flex-row space-y-4 sm:space-x-8 sm:space-y-0">
      <li
        v-for="link of navigation"
        :key="link._path"
        class="relative"
      >
        <NuxtLink
          :to="link._path"
          :class="{ 'text-primary-500': $route.path === link._path }"
          @click="handleClick"
        >
          <span class="absolute bottom-[-4px] h-1 w-0 bg-current transition-width duration-200 ease-in-out hover:w-full" />
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
