---
title: Achieving Full-Stack Type Safety with Nuxt, Drizzle, and Directus
description: Learn how I leveraged Drizzle ORM's schema introspection with Directus CMS in a Nuxt application for end-to-end type safety
date: 2025-01-15T00:00:00.000Z
categories:
  - Nuxt
  - Database
  - TypeScript
tags:
  - Drizzle ORM
  - Directus
  - Type Safety
  - Database Schema
---

In my recent Nuxt projects, I've been exploring ways to maintain type safety across the full stack while providing a great content management experience. The combination of Drizzle ORM and Directus CMS has proven to be a powerful solution, especially when integrated with Nuxt's server routes.

## The Challenge

When building Nuxt applications with TypeScript, maintaining type safety between your database and application code can be challenging. This becomes even more complex when you add a CMS into the mix. Here's how I solved this using Drizzle ORM's schema introspection capabilities with Directus in a Nuxt environment.

## Prerequisites

Before we begin, you'll need:
- A Nuxt 3 project
- A PostgreSQL database
  - This can be any Postgres database you can connect to (local, hosted, or managed)
  - Examples include: Supabase, Neon, Railway, or your own PostgreSQL instance
- Basic understanding of TypeScript

## Database Setup Options

While this guide uses Directus as an example, you can use any PostgreSQL database setup. Directus provides a nice admin UI and API out of the box, but you could also:
- Connect directly to your Postgres database
- Use other database management tools
- Set up your own custom admin interface

The type safety benefits of Drizzle work with any Postgres setup - choose what works best for your project!

## Setting Up the Foundation

First, I configure Drizzle to connect to my Directus-managed database:

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

Then, I create a type-safe database instance that Nuxt can use:

```typescript
// server/db.ts
import { drizzle } from 'drizzle-orm/node-postgres'
import * as relations from '../drizzle/relations'
import * as schema from '../drizzle/schema'
import 'dotenv/config'

export const db = drizzle(import.meta.env.DATABASE_URL!, {
  schema: { ...relations, ...schema }
})
```

## Schema Introspection

When I run `drizzle-kit pull`, Drizzle automatically generates TypeScript definitions from my Directus database. What's great is that these types work seamlessly with Nuxt's server routes:

```typescript
// drizzle/schema.ts
export const post = pgTable('Post', {
  id: uuid('id').primaryKey().notNull(),
  status: varchar('status').default('draft').notNull(),
  categoryId: uuid('category_id'),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  content: text('content'),
  dateCreated: timestamp('date_created').defaultNow().notNull(),
  dateUpdated: timestamp('date_updated').defaultNow().notNull(),
  userCreated: uuid('user_created').notNull(),
}, table => [
  // Foreign keys are automatically detected from the database
  foreignKey({
    columns: [table.categoryId],
    foreignColumns: [category.id],
    name: 'post_category_id_foreign'
  })
])

export const postTranslations = pgTable('Post_translations', {
  id: uuid('id').primaryKey().notNull(),
  postId: uuid('post_id').notNull(),
  languagesCode: varchar('languages_code', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }),
  content: text('content'),
}, table => [
  // These relations are automatically generated based on your database structure
  foreignKey({
    columns: [table.postId],
    foreignColumns: [post.id],
    name: 'post_translations_post_id_foreign',
    onDelete: 'cascade'
  }),
  foreignKey({
    columns: [table.languagesCode],
    foreignColumns: [languages.code],
    name: 'post_translations_languages_code_foreign',
    onDelete: 'cascade'
  }),
])
```

The relations file is also automatically generated:

```typescript
// drizzle/relations.ts
export const postRelations = relations(post, ({ one, many }) => ({
  category: one(category, {
    fields: [post.categoryId],
    references: [category.id],
  }),
  translations: many(postTranslations),
  author: one(directusUsers, {
    fields: [post.userCreated],
    references: [directusUsers.id],
  }),
}))

export const postTranslationsRelations = relations(postTranslations, ({ one }) => ({
  post: one(post, {
    fields: [postTranslations.postId],
    references: [post.id],
  }),
  language: one(languages, {
    fields: [postTranslations.languagesCode],
    references: [languages.code],
  }),
}))
```

## Using Drizzle in Nuxt Server Routes

These introspected drizzle types make it easy to create type-safe queries in your Nuxt server routes:

```typescript
// server/api/posts/[id].get.ts
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { post, postTranslations } from '~/drizzle/schema'

const QuerySchema = z.object({
  lang: z.string().optional(),
})

const ParamsSchema = z.object({
  id: z.string().uuid('Invalid post ID'),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, ParamsSchema.parse)
  const query = await getValidatedQuery(event, QuerySchema.parse)

  // TypeScript knows exactly what relations are available
  const post = await db.query.post.findFirst({
    where: eq(post.id, params.id),
    with: {
      category: true,
      translations: {
        where: eq(postTranslations.languagesCode, query.lang),
      },
      author: {
        columns: {
          id: true,
          firstName: true,
          lastName: true,
        }
      }
    }
  })

  if (!post)
    throw createError({ statusCode: 404, message: 'Post not found' })

  return post
})
```

## Using Related Data in Components

The type safety extends to your Nuxt components:

```vue
<script setup lang="ts">
const route = useRoute()
const { data: post, error } = await useFetch(`/api/posts/${route.params.id}`, {
  // TypeScript knows the exact shape of your data
  transform: post => ({
    ...post,
    formattedDate: new Date(post.dateCreated).toLocaleDateString()
  })
})
</script>

<template>
  <div>
    <p v-if="error" class="error">
      {{ error.statusCode === 404 ? 'Post not found' : 'Error loading post' }}
    </p>

    <article v-else-if="post">
      <h1>{{ post.title }}</h1>
      <div class="metadata">
        <span>Category: {{ post.category?.name }}</span>
        <span>Author: {{ post.author.firstName }} {{ post.author.lastName }}</span>
        <time>{{ post.formattedDate }}</time>
      </div>
      <div v-html="post.content" />
    </article>
  </div>
</template>
```

## Why This Approach Works Great with Nuxt

1. **Nuxt Server Routes**: Drizzle integrates perfectly with Nuxt's server directory structure
2. **Auto-imports**: Nuxt's auto-imports work seamlessly with your type-safe services
3. **Full-Stack Type Safety**: Types flow from database through API to components
4. **Developer Experience**: Great IDE support and error catching
5. **Content Management**: Non-technical users can use Directus's interface

## Real-World Benefits

In my Nuxt projects, this setup has:
- Caught type errors before they reach production
- Made refactoring much safer
- Improved development speed
- Provided great content management for clients

## Conclusion

The combination of Nuxt, Drizzle ORM, and Directus has transformed how I build type-safe applications. The automatic schema introspection and Nuxt's server capabilities mean I spend less time writing types and more time building features.

If you're building a Nuxt application that needs both type safety and content management, I highly recommend this stack. The initial setup effort pays off many times over in development efficiency and code reliability.

Remember to:
1. Run `drizzle-kit pull` after schema changes in Directus
2. Leverage Nuxt's server directory structure
3. Use `useFetch` for type-safe API calls
4. Let TypeScript guide you through using your database correctly!
