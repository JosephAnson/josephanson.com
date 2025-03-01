export function themeClasses(key: string) {
  return {
    text: `text-${key}-950 dark:text-${key}-50`,
    textLight: `text-${key}-900 dark:text-${key}-300`,
    textTint: `text-${key}-500`,
    highlight: `text-${key}-600 dark:text-${key}-400`,
    menu: `bg-${key}-500 dark:bg-${key}-500`,
    menuUnderline: `bg-${key}-900 dark:bg-${key}-200`,
    button: `rounded text-white dark:text-white bg-${key}-700 hover:bg-${key}-800 dark:bg-${key}-700 dark:hover:bg-${key}-600 transition`,
    link: `text-${key}-600 hover:text-${key}-800 dark:text-${key}-300 dark:hover:text-${key}-200`,
    card: `border-${key}-500 border-1 bg-${key}-300 dark:bg-${key}-700`,
    cardHover: `transition hover:bg-${key}-200:80 dark:hover:bg-${key}-800:80`,
    fill: `fill-${key}-500 dark:fill-${key}-500`,
    stroke: `stroke-${key}-500`,
    gradient: `transition will-change-background bg-gradient-to-b from-${key}-200 via-${key}-100 to-${key}-50 dark:from-${key}-800 dark:via-${key}-900 dark:to-${key}-950`,
    htmlBackground: `bg-${key}-200 [&.dark]:bg-${key}-800`,
    icon: `hover:text-${key}-700 dark:hover:text-${key}-300`,
    tag: `inline-flex py-1 px-2 text-sm justify-center items-center rounded flex-wrap gap-x-1 rounded font-medium text-${key}-950 bg-${key}-200 dark:text-${key}-100 dark:bg-${key}-950`,
  }
}
