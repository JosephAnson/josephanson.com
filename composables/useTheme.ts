export function useTheme() {
  const route = useRoute()

  return computed(() => route.path === '/' ? 'primary' : 'secondary')
}
