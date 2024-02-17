import { tailwindColors } from '~/utils/constants'
import { themeClasses } from '~/utils/themeClasses'

const useThemeChoices = () => useState<Record<string, string>>('theme-choices', () => ({}))
export const useCurrentTheme = () => useState<string>('theme', () => '')

export function useTheme() {
  const themeChoices = useThemeChoices()
  const currentTheme = useCurrentTheme()
  const route = useRoute()
  const themes = tailwindColors

  const classes = computed(() => themeClasses(currentTheme.value))

  watch(() => route.path, (path) => {
    if (themeChoices.value?.[path])
      currentTheme.value = themeChoices.value[path]
    else if (path === '/projects')
      currentTheme.value = 'purple'
    else if (path.includes('/blog'))
      currentTheme.value = 'emerald'
    else
      currentTheme.value = 'blue'
  }, { immediate: true })

  function rotateTheme() {
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    currentTheme.value = themes[nextIndex]
    themeChoices.value[route.path] = themes[nextIndex]
  }

  return {
    classes,
    rotateTheme,
  }
}
