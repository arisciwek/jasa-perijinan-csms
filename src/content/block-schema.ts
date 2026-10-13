import { z } from 'astro:content';

/**
 * Shared contract for content-driven Astro blocks.
 * Keep each block's frontmatter data explicit so content validation and
 * rendering use the same discriminated union.
 */
export const contentBlockSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string().min(1),
    type: z.literal('stats-grid'),
    data: z.object({
      items: z.array(z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      })).min(1),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('quick-answer'),
    data: z.object({
      title: z.string().min(1),
      answer: z.string().min(1),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('process-timeline'),
    data: z.object({
      title: z.string().min(1),
      steps: z.array(z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      })).min(1),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('requirement-checklist'),
    data: z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      items: z.array(z.object({
        label: z.string().min(1),
        required: z.boolean().optional(),
      })).min(1),
      disclaimer: z.string().optional(),
    }),
  }),
]);

export type ContentBlock = z.infer<typeof contentBlockSchema>;
