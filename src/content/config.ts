import { defineCollection, z } from 'astro:content';
import { serviceIds } from '../config/site.ts';

const articleSchema = z.object({
  id: z.number().int().positive().optional(),
  ulid: z.string().optional(),
  type: z.literal('article'),
  title: z.string().min(1),
  description: z.string().min(1),
  pubDate: z.string().datetime({ offset: true }),
  updatedDate: z.string().datetime({ offset: true }).optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  image: z.string().optional(),
  relatedService: z
    .number()
    .int()
    .positive()
    .refine(id => serviceIds.includes(id), {
      message: 'relatedService harus berupa id layanan yang valid (lihat services di src/config/site.ts)',
    })
    .optional(),
});

const pageSchema = z.object({
  id: z.number().int().positive().optional(),
  ulid: z.string().optional(),
  type: z.literal('page'),
  slug: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  pubDate: z.string().datetime({ offset: true }).optional(),
  updatedDate: z.string().datetime({ offset: true }).optional(),
  draft: z.boolean().default(false),
  image: z.string().optional(),
});

const categorySchema = z.object({
  id: z.number().int().positive().optional(),
  ulid: z.string().optional(),
  type: z.literal('category'),
  slug: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
});

const authorSchema = z.object({
  id: z.number().int().positive().optional(),
  ulid: z.string().optional(),
  type: z.literal('author'),
  slug: z.string(),
  title: z.string().min(1),
  role: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

export const collections = {
  articles: defineCollection({
    type: 'content',
    schema: articleSchema,
  }),
  pages: defineCollection({
    type: 'content',
    schema: pageSchema,
  }),
  categories: defineCollection({
    type: 'data',
    schema: categorySchema,
  }),
  authors: defineCollection({
    type: 'data',
    schema: authorSchema,
  }),
};