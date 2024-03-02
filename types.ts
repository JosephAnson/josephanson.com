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

export interface Project {
  _id: string
  _path: string
  id: string
  title: string
  description: string
  image?: string
  link: string
}
