import { defineCollection, defineContentConfig } from '@nuxt/content'
import { articleSchema } from './schemas/article'
import { projectSchema } from './schemas/project'
import { talkSchema } from './schemas/talk'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md',
    }),
    articles: defineCollection({
      type: 'page',
      source: '*articles/**/*.md',
      schema: articleSchema,
    }),
    projects: defineCollection({
      type: 'page',
      source: '*projects/**/*.yml',
      schema: projectSchema,
    }),
    talks: defineCollection({
      type: 'page',
      source: '*talks/**/*.md',
      schema: talkSchema,
    }),
  },
})
