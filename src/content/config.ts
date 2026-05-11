import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    lang: z.enum(['en', 'pt']).optional().default('en'),
    translationKey: z.string().optional(),
    series: z.string().optional(),
    seriesTitle: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
  }),
});

export const collections = { posts };
