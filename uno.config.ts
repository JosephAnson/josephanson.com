import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import type { UserConfig } from '@unocss/core'
import { tailwindColors, themeConfig } from './utils/constants'

export const colors: string[] = [
  ...Object.keys(themeConfig.colors),
  ...tailwindColors,
]
  .map((key) => {
    return Object.values(themeClasses(key))?.map(item => item.split(' ')).flat()
  },
  ).flat()

export function themeClasses(key: string) {
  return {
    text: `text-${key}-950 dark:text-${key}-50`,
    textLight: `text-${key}-900 dark:text-${key}-300`,
    textTint: `text-${key}-500`,
    highlight: `text-${key}-600 dark:text-${key}-400`,
    menu: `bg-${key}-300 dark:bg-${key}-800`,
    menuUnderline: `bg-${key}-900 dark:bg-${key}-200`,
    button: `rounded bg-${key}-500:20 hover:bg-${key}-500:50 px-4 py-2 transition`,
    link: `text-${key}-600 hover:text-${key}-800 dark:text-${key}-400 dark:hover:text-${key}-200`,
    card: `transition bg-${key}-500:20 hover:bg-${key}-500:30`,
    fill: `fill-${key}-300 dark:fill-${key}-800`,
    gradient: `bg-gradient-to-b from-${key}-200 via-${key}-100 to-${key}-50 dark:from-${key}-800 dark:via-${key}-900 dark:to-${key}-950`,
    icon: `hover:text-${key}-500 dark:hover:text-${key}-300`,
    tag: `rounded-full px-3 py-1.5 font-medium text-${key}-800 bg-${key}-50 dark:text-${key}-100 dark:bg-${key}-950`,
  }
}

export const unocssConfig: UserConfig<any> = {
  shortcuts: {
    transition: 'transition-colors',
  },
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: ['Poppins', 'Poppins:400, 500,700'],
        serif: ['Yeseva One', 'Yeseva One:400, 500, 700'],
        mono: 'DM Sans Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: themeConfig,
  safelist: [
    ...colors,
  ],
}

export default defineConfig(unocssConfig)
