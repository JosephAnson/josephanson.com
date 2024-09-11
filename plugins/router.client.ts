import NProgress from 'nprogress'
import { setupRouterScroller } from 'vue-router-better-scroller'
import type { Router } from 'vue-router'

export default defineNuxtPlugin(() => {
  // Doing something with nuxtApp
  const router = useRouter()

  const html = document.querySelector('html')!
  setupRouterScroller(router as Router, {
    selectors: {
      html(ctx) {
        // only do the sliding transition when the scroll position is not 0
        if (ctx.savedPosition?.top)
          html.classList.add('no-sliding')
        else
          html.classList.remove('no-sliding')
        return true
      },
    },
    behavior: 'auto',
  })

  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
})
