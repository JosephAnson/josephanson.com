<script setup lang="ts">
const show = useShowMenu()
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const route = useRoute()
const navigation = siteNavigation

const activeNavigationIndex = computed(() => {
  if (route.path.startsWith('/projects'))
    return 1

  if (route.path.startsWith('/articles'))
    return 2

  if (route.path.startsWith('/talks'))
    return 3

  return 0
})

const routePosition = computed(() => `${activeNavigationIndex.value * 33}%`)

function isActive(path: string) {
  return isSiteNavigationActive(route.path, path)
}

function toggleMenu() {
  show.value = !show.value
}

watch(show, (isOpen, wasOpen) => {
  if (wasOpen && !isOpen)
    nextTick(() => menuButton.value?.focus())
})
</script>

<template>
  <header class="site-header print:hidden">
    <BaseContainer class="site-header-inner">
      <NuxtLink to="/" class="site-identity" aria-label="Joseph Anson, home">
        <span class="site-wordmark">Joseph Anson</span>
      </NuxtLink>

      <div class="site-route-rail" aria-hidden="true">
        <Transition name="rail-value" mode="out-in">
          <span :key="navigation[activeNavigationIndex]?.index" class="site-route-rail-code">
            {{ navigation[activeNavigationIndex]?.index }}
          </span>
        </Transition>
        <span class="site-route-rail-track">
          <span class="site-route-rail-position" :style="{ left: routePosition }" />
        </span>
        <Transition name="rail-value" mode="out-in">
          <span :key="navigation[activeNavigationIndex]?.label" class="site-route-rail-label">
            {{ navigation[activeNavigationIndex]?.label }}
          </span>
        </Transition>
      </div>

      <div class="site-header-actions">
        <nav aria-label="Primary navigation" class="site-desktop-nav">
          <NuxtLink
            v-for="item in navigation.slice(1)"
            :key="item.path"
            :to="item.path"
            class="site-nav-link"
            exact-active-class="is-active"
            :aria-current="isActive(item.path) ? 'page' : undefined"
          >
            <span class="site-nav-index" aria-hidden="true">{{ item.index }}</span>
            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <BaseToggleTheme />

        <button
          id="site-navigation-trigger"
          ref="menuButton"
          type="button"
          class="site-menu-trigger"
          :aria-label="show ? 'Close navigation menu' : 'Open navigation menu'"
          aria-controls="site-navigation"
          :aria-expanded="show"
          @click="toggleMenu"
        >
          <span aria-hidden="true">Menu</span>
        </button>
      </div>
    </BaseContainer>
    <TheNav />
  </header>
</template>
