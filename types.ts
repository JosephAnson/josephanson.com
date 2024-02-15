export type ColorModes = 'dark' | 'light'

export interface Article {
  _id: string
  _path: string
  title: string
  date: string
  description: string
  categories: string[]
  badges?: { bg: string, text: string, content: string }[]
}
