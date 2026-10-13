import { z } from 'astro:content';
import { csmsElementIds } from '../config/site.ts';

/**
 * Shared contract for content-driven Astro blocks.
 * Keep each block's frontmatter data explicit so content validation and
 * rendering use the same discriminated union.
 */
export const contentBlockSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string().min(1),
    type: z.literal('latest-articles'),
    data: z.object({
      title: z.string().min(1),
      limit: z.number().int().positive().max(6),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('image-panel'),
    data: z.object({
      src: z.string().startsWith('/'),
      alt: z.string().min(1),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('hero'),
    data: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      primaryLabel: z.string().min(1),
      primaryHref: z.string().min(1),
      secondaryLabel: z.string().min(1),
      secondaryHref: z.string().min(1),
      secondaryIsWhatsApp: z.boolean().optional(),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('service-card-grid'),
    data: z.object({
      title: z.string().min(1),
      items: z.array(z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        audience: z.string().min(1),
        href: z.string().startsWith('/'),
      })).min(1),
    }),
  }),
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
    type: z.literal('csms-element-grid'),
    data: z.object({
      title: z.string().min(1),
      items: z.array(z.object({
        elementId: z.number().int().positive().refine((id) => csmsElementIds.includes(id), {
          message: 'elementId harus merujuk ke elemen CSMS di src/config/site.ts',
        }),
        description: z.string().min(1),
      })).min(1),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('testimonial-grid'),
    data: z.object({
      title: z.string().min(1),
      items: z.array(z.object({
        quote: z.string().min(1),
        attribution: z.string().min(1),
      })).min(1),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('call-to-action'),
    data: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      primaryLabel: z.string().min(1),
      primaryHref: z.string().min(1),
      secondaryLabel: z.string().min(1),
      secondaryHref: z.string().min(1),
      secondaryIsWhatsApp: z.boolean().optional(),
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
