export function useProjectScreenshot() {
  const colorMode = useColorMode()
  const isMounted = useMounted()
  const image = useImage()

  // Color mode is resolved from localStorage before Vue hydrates, while SSR
  // uses the configured default. Keep the initial URL deterministic and only
  // switch to the visitor's saved theme after hydration completes.
  const screenshotTheme = computed(() => isMounted.value ? colorMode.value : 'dark')

  function projectScreenshot(title: string, width = 1600) {
    const slug = title
      .toLowerCase()
      .replaceAll(/[ &]/g, '-')
      .replaceAll(/-{2,}/g, '-')

    return image(
      `http://storage.josephanson.com:9000/screenshots/${slug}-${screenshotTheme.value}.jpg`,
      {
        width,
        quality: 82,
        format: 'webp',
      },
    )
  }

  return { projectScreenshot }
}
