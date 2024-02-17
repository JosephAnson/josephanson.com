import type { UserConfig } from '@unocss/core'

export const appName = 'Joseph Anson'
export const appDescription = 'Joseph Anson\'s personal website'

export const tailwindColors = [
  'green',
  'violet',
  'amber',
  'slate',
  'pink',
  'lime',
  'indigo',
  'gray',
  'red',
  'cyan',
  'stone',
  'blue',
  'orange',
  'rose',
  'neutral',
  'teal',
  'yellow',
  'fuchsia',
  'sky',
  'purple',
  'zinc',
  'emerald',
]

export const themeConfig: UserConfig<any>['theme'] = {
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
      950: '#281707',
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
      950: '#0d335d',
    },
    tertiary: {
      50: '#faf5ff',
      100: '#f4e8ff',
      200: '#ebd5ff',
      300: '#dab4fe',
      400: '#c184fc',
      500: '#a855f7',
      600: '#9133ea',
      700: '#7a22ce',
      800: '#6621a8',
      900: '#531c87',
      950: '#370764',
    },
  },
}
