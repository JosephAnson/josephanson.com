import { themeClasses } from '~/utils/themeClasses'

export const useCurrentTheme = () => useState<string>('theme', () => '')

export function useTheme() {
  const route = useRoute()
  const currentTheme = useCurrentTheme()
  const classes = computed(() => themeClasses(currentTheme.value))
  const pairTheme = computed(() => currentTheme.value)
  const pairClasses = computed(() => themeClasses(currentTheme.value))

  watch(() => route.path, (path) => {
    if (path === '/projects')
      currentTheme.value = 'violet'
    else if (path.includes('/articles'))
      currentTheme.value = 'emerald'
    else if (path.includes('/talks'))
      currentTheme.value = 'rust'
    else
      currentTheme.value = 'blue'
  }, { immediate: true })

  return {
    classes,
    pairClasses,
    currentTheme,
    pairTheme,
  }
}
