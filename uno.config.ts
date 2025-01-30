import type { UserConfig } from '@unocss/core'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { tailwindColors } from './app/utils/constants'
import { themeClasses } from './app/utils/themeClasses'

export const colors: string[] = tailwindColors
  .map((key) => {
    return Object.values(themeClasses(key))?.map(item => item.split(' ')).flat()
  })
  .flat()

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
        sans: ['Poppins', 'Poppins:400,500,600,700'],
        mono: 'DM Sans Mono',
      },
    }),
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
  },
}

export default defineConfig(unocssConfig)
