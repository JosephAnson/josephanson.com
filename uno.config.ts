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
      `bg-${key}-500:20`,
      `fill-${key}-300`,
      `dark:fill-${key}-800`,
      `hover:text-${key}-800`,
      `dark:hover:text-${key}-800`,
      ...Object.keys(value as Record<string, string>)
        .map(item => [`text-${key}-${item}`, `bg-${key}-${item}`, `dark:text-${key}-${item}`, `dark:bg-${key}-${item}`]),
    ].flat(),
  ).flat()

export const unocssConfig: UserConfig<any> = {
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
