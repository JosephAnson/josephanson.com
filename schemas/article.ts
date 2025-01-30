import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  image: z.string().url().optional(),
  author: z.string().optional(),
  draft: z.boolean().default(false),
})

export type Article = z.infer<typeof articleSchema>
