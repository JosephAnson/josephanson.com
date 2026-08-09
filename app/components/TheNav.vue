<script setup lang="ts">
const menu = useTemplateRef<HTMLElement>('menu')
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')
const show = useShowMenu()
const route = useRoute()
const navigation = siteNavigation
const isDesktop = useMediaQuery('(min-width: 48rem)')
let previousBodyOverflow = ''

function onClose() {
  show.value = false
}

function setBackgroundInert(isInert: boolean) {
  document.querySelector('.site-header-inner')?.toggleAttribute('inert', isInert)
  document.querySelector('main')?.toggleAttribute('inert', isInert)
  document.querySelector('footer')?.toggleAttribute('inert', isInert)
}

function onKeydown(event: KeyboardEvent) {
  if (!show.value)
    return

  if (event.key === 'Escape') {
    event.preventDefault()
    onClose()
    return
  }

  if (event.key !== 'Tab' || !menu.value)
    return

  const focusable = Array.from(menu.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
    .filter(element => !element.hasAttribute('disabled'))

  if (!focusable.length)
    return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

watch(show, async (isOpen) => {
  if (import.meta.server)
    return

  setBackgroundInert(isOpen)
  if (isOpen) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = previousBodyOverflow
  }

  if (isOpen) {
    await nextTick()
    closeButton.value?.focus()
  }
})

watch(() => route.fullPath, onClose)
watch(isDesktop, (matches) => {
  if (matches)
    onClose()
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    setBackgroundInert(false)
    document.body.style.overflow = previousBodyOverflow
  }
})
</script>

<template>
  <Transition name="menu-curtain">
    <div
      v-if="show"
      id="site-navigation"
      ref="menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      class="site-mobile-menu is-open print:hidden"
      @keydown="onKeydown"
    >
      <BaseContainer class="site-mobile-menu-shell">
        <div class="site-mobile-menu-layout">
          <div class="site-mobile-menu-header">
            <NuxtLink to="/" class="site-identity site-mobile-menu-brand" aria-label="Joseph Anson, home" @click="onClose">
              <span class="site-wordmark">Joseph Anson</span>
            </NuxtLink>
            <button
              ref="closeButton"
              type="button"
              class="site-menu-close"
              aria-label="Close navigation menu"
              @click="onClose"
            >
              <span>Close</span>
              <span class="i-ph:x h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav class="site-mobile-navigation" aria-label="Mobile navigation">
            <ul class="site-mobile-nav-list">
              <li
                v-for="link of navigation"
                :key="link.path"
              >
                <NuxtLink
                  :to="link.path"
                  class="site-mobile-nav-link"
                  :class="{ 'is-active': isSiteNavigationActive(route.path, link.path) }"
                  :aria-current="isSiteNavigationActive(route.path, link.path) ? 'page' : undefined"
                  @click="onClose"
                >
                  <span class="site-mobile-nav-index" aria-hidden="true">{{ link.index }}</span>
                  <span class="site-mobile-nav-label">{{ link.label }}</span>
                  <span v-if="isSiteNavigationActive(route.path, link.path)" class="site-mobile-nav-state">Current</span>
                  <span v-else class="site-mobile-nav-arrow i-ph:arrow-right h-5 w-5" aria-hidden="true" />
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="site-mobile-menu-footer">
            <p>Madrid / WWW</p>
            <div class="site-mobile-appearance">
              <span>Appearance</span>
              <BaseToggleTheme class="site-mobile-appearance-toggle" />
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  </Transition>
</template>
