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
      currentTheme.value = 'indigo'
    else if (path.includes('/articles'))
      currentTheme.value = 'emerald'
    else if (path.includes('/talks'))
      currentTheme.value = 'cyan'
    else
      currentTheme.value = 'blue'
  }, { immediate: true })

  function rotateTheme() {
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    currentTheme.value = themes[nextIndex]!
    themeChoices.value[route.path] = themes[nextIndex]!
  }

  return {
    classes,
    currentTheme,
    rotateTheme,
  }
}
