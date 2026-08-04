import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Syrlas AI Team'),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};