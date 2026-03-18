import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    blog: defineCollection({
      type: 'page',
      source: '{fr,en}/blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        category: z.string(),
        image: z.string().optional(),
        readingTime: z.number(),
        featured: z.boolean().optional().default(false),
      }),
    }),
  },
})
