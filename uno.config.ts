import type { UserConfig } from '@unocss/core'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { tailwindColors } from './app/utils/constants.ts'
import { themeClasses } from './app/utils/themeClasses.ts'

export const colors: string[] = tailwindColors
  .map((key) => {
    return Object.values(themeClasses(key))?.map(item => item.split(' ')).flat()
  })
  .flat()

export const unocssConfig: UserConfig<any> = {
  blocklist: [/pascalCase\(component\)/],
  content: {
    pipeline: {
      exclude: [
        /\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/,
        /[/\\]\.github[/\\]/,
        /[/\\]\.impeccable[/\\]/,
      ],
    },
  },
  presets: [
    presetWind3(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: colors,
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: '"Commissioner Variable", sans-serif',
      display: '"Archivo Variable", sans-serif',
    },
  },
}

export default defineConfig(unocssConfig)
