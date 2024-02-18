export function themeClasses(key: string) {
  return {
    text: `text-${key}-950 dark:text-${key}-50`,
    textLight: `text-${key}-900 dark:text-${key}-300`,
    textTint: `text-${key}-500`,
    highlight: `text-${key}-600 dark:text-${key}-400`,
    menu: `bg-${key}-300 dark:bg-${key}-800`,
    menuUnderline: `bg-${key}-900 dark:bg-${key}-200`,
    button: `rounded bg-${key}-500:20 hover:bg-${key}-500:50 px-4 py-2 transition`,
    link: `text-${key}-600 hover:text-${key}-800 dark:text-${key}-300 dark:hover:text-${key}-200`,
    card: `transition border-${key}-500 border-1 bg-${key}-300:80 hover:bg-${key}-200:80 dark:bg-${key}-700:80 dark:hover:bg-${key}-800:80`,
    fill: `fill-${key}-500 dark:fill-${key}-500`,
    gradient: `bg-gradient-to-b from-${key}-200 via-${key}-100 to-${key}-50 dark:from-${key}-800 dark:via-${key}-900 dark:to-${key}-950`,
    icon: `hover:text-${key}-700 dark:hover:text-${key}-300`,
    tag: `rounded-full px-3 py-1.5 font-medium text-${key}-800 bg-${key}-50 dark:text-${key}-100 dark:bg-${key}-950`,
  }
}
