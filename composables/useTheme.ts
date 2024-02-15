export const useTheme = createGlobalState(() => {
  const route = useRoute()
  const currentTheme = useState<string>('theme', () => 'primary')

  const themes = Object.keys(themeConfig.colors)

  watch(() => route.path, (path) => {
    if (path === '/projects')
      currentTheme.value = 'secondary'
    else if (path.includes('/blog'))
      currentTheme.value = 'tertiary'
    else
      currentTheme.value = 'primary'
  }, { immediate: true })

  function rotateTheme() {
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    currentTheme.value = themes[nextIndex]
  }

  return {
    currentTheme,
    rotateTheme,
  }
})
