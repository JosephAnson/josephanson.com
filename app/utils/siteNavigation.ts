export const siteNavigation = [
  { path: '/', label: 'Home', index: '00' },
  { path: '/projects', label: 'Work', index: '01' },
  { path: '/articles', label: 'Notes', index: '02' },
  { path: '/talks', label: 'Talks', index: '03' },
] as const

export function isSiteNavigationActive(currentPath: string, targetPath: string) {
  if (targetPath === '/')
    return currentPath === '/'

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
}
