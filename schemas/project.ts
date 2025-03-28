import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.coerce.date(),
  technologies: z.array(z.string()),
  image: z.string().url(),
  link: z.string().url().optional(),
  repository: z.string().url().optional(),
  status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
})

export type Project = z.infer<typeof projectSchema>
