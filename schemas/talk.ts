import { z } from 'zod'

const speakerSchema = z.object({
  name: z.string().min(1, 'Speaker name is required'),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
})

const resourceSchema = z.object({
  title: z.string().min(1, 'Resource title is required'),
  url: z.string().url(),
})

export const talkSchema = z.object({
  image: z.string().url().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  url: z.string().url(),
  event: z.string(),
  eventUrl: z.string().url(),
  location: z.string(),
  speaker: speakerSchema.optional(),
  resources: z.array(resourceSchema).optional(),
  recordingUrl: z.string().url().optional(),
})

export type Talk = z.infer<typeof talkSchema>
