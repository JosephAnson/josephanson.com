import { z } from 'zod'

export const talkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  url: z.string().url(),
  event: z.string(),
  location: z.string(),
})

export type Talk = z.infer<typeof talkSchema>
