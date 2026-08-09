import { defineCollection, defineContentConfig } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { z } from 'zod'
import { articleSchema } from './schemas/article'
import { projectSchema } from './schemas/project'
import { talkSchema } from './schemas/talk'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        sitemap: defineSitemapSchema({ z }),
      }),
    }),
    articles: defineCollection({
      type: 'page',
      source: '*articles/**/*.md',
      schema: articleSchema.extend({
        sitemap: defineSitemapSchema({ z }),
      }),
    }),
    projects: defineCollection({
      type: 'page',
      source: '*projects/**/*.yml',
      schema: projectSchema.extend({
        sitemap: defineSitemapSchema({ z }),
      }),
    }),
    talks: defineCollection({
      type: 'page',
      source: '*talks/**/*.md',
      schema: talkSchema.extend({
        sitemap: defineSitemapSchema({ z }),
      }),
    }),
  },
})
