import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
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
  theme: {
    container: {
      center: true,
    },
    colors: {
      primary: {
        50: '#fdf6ec',
        100: '#fae6cf',
        200: '#f7d5a1',
        300: '#f4c473',
        400: '#f1b345',
        500: '#f6a33b',
        600: '#da8f34',
        700: '#be7b2d',
        800: '#a26726',
        900: '#86531f',
      },
      secondary: {
        default: '#3b93f6',
        50: '#eff7ff',
        100: '#dbecfe',
        200: '#bfddfe',
        300: '#93c5fd',
        400: '#60a9fa',
        500: '#3b93f6',
        600: '#2582eb',
        700: '#1d75d8',
        800: '#1e62af',
        900: '#1e518a',
        950: '#173454',
      },
    },
  },
})
