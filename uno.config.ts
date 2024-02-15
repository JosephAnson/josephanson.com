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
import { themeConfig } from './utils/constants'

const colors: string[] = Object.entries(themeConfig.colors)
  .map(([key, value]) =>
    [
        // Opacity Background
        `bg-${key}-500:20`,

        // Footer Icons
        `hover:text-${key}-800`,
        `dark:hover:text-${key}-800`,

        // Waves
        `fill-${key}-300`,
        `dark:fill-${key}-800`,

        // Gradients
        `from-${key}-200`,
        `via-${key}-100`,
        `to-${key}-50`,
        `dark:from-${key}-800`,
        `dark:via-${key}900`,
        `dark:to-${key}-950`,

        ...Object.keys(value as Record<string, string>)
          .map(item => [
            `text-${key}-${item}`,
            `bg-${key}-${item}`,
            `dark:text-${key}-${item}`,
            `dark:bg-${key}-${item}`,
          ]),
    ].flat(),
  ).flat()

export const unocssConfig: UserConfig<any> = {
  shortcuts: {
    transition: 'transition-all duration-300',
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
