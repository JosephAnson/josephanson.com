import { z } from 'zod'

export const talkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  url: z.string().url().optional(),
  event: z.string().optional(),
  location: z.string().optional(),
})

export type Talk = z.infer<typeof talkSchema>
