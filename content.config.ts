import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'
import { articleSchema } from './schemas/article'
import { projectSchema } from './schemas/project'
import { talkSchema } from './schemas/talk'

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: '*.md',
      }),
    ),
    articles: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: '*articles/**/*.md',
        schema: articleSchema,
      }),
    ),
    projects: defineCollection({
      type: 'page',
      source: '*projects/**/*.yml',
      schema: projectSchema,
    }),
    talks: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: '*talks/**/*.md',
        schema: talkSchema,
      }),
    ),
  },
})
