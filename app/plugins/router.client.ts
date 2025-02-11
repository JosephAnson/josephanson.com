import NProgress from 'nprogress'

export default defineNuxtPlugin(() => {
  // Doing something with nuxtApp
  const router = useRouter()

  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
})
