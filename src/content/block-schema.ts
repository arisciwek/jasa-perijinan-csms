import { z } from 'astro:content';
import { csmsElementIds, serviceIds } from '../config/site.ts';

/**
 * Shared contract for content-driven Astro blocks.
 * Keep each block's frontmatter data explicit so content validation and
 * rendering use the same discriminated union.
 */
export const contentBlockSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string().min(1),
    type: z.literal('contact-panel'),
    data: z.object({
      title: z.string().min(1),
      intro: z.string().min(1),
      contacts: z.array(z.object({
        label: z.string().min(1),
        phone: z.string().min(1),
        display: z.string().min(1),
      })).min(1),
      hoursTitle: z.string().min(1),
      hours: z.array(z.string().min(1)).min(1),
      formTitle: z.string().min(1),
      serviceOptions: z.array(z.string().min(1)).min(1),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('content-section'),
    data: z.object({
      title: z.string().min(1),
      paragraphs: z.array(z.string().min(1)).min(1),
      variant: z.enum(['plain', 'muted', 'primary']).optional(),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('feature-card-grid'),
    data: z.object({
      title: z.string().min(1),
      columns: z.union([z.literal(2), z.literal(3)]),
      items: z.array(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        points: z.array(z.string().min(1)).optional(),
      })).min(1),
    }),
  }),
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
    type: z.literal('csms-element-detail'),
    data: z.object({
      elementId: z.number().int().positive().refine((id) => csmsElementIds.includes(id), {
        message: 'elementId harus merujuk ke elemen CSMS di src/config/site.ts',
      }),
      heading: z.string().min(1),
      badge: z.string().min(1),
      subtitle: z.string().min(1),
      imageAlt: z.string().min(1),
      sections: z.array(z.object({
        title: z.string().min(1),
        variant: z.enum(['default', 'primary']).optional(),
        paragraphs: z.array(z.string().min(1)).optional(),
        items: z.array(z.object({
          label: z.string().optional(),
          text: z.string().min(1),
        })).optional(),
        ordered: z.boolean().optional(),
        table: z.object({
          headers: z.array(z.string().min(1)).min(1),
          rows: z.array(z.array(z.string().min(1).min(1))),
        }).optional(),
        note: z.string().optional(),
      })).min(1),
      sidebar: z.object({
        ctaTitle: z.string().min(1),
        ctaDescription: z.string().min(1),
        ctaLabel: z.string().min(1),
        ctaHref: z.string().min(1),
      }),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('service-detail'),
    data: z.object({
      serviceId: z.number().int().positive().refine((id) => serviceIds.includes(id), {
        message: 'serviceId harus merujuk ke layanan di src/config/site.ts',
      }),
      heading: z.string().min(1),
      badge: z.string().min(1),
      subtitle: z.string().min(1),
      imageAlt: z.string().min(1),
      sections: z.array(z.object({
        title: z.string().min(1),
        variant: z.enum(['default', 'primary']).optional(),
        paragraphs: z.array(z.string().min(1)).optional(),
        items: z.array(z.object({
          label: z.string().optional(),
          text: z.string().min(1),
        })).optional(),
        ordered: z.boolean().optional(),
        table: z.object({
          headers: z.array(z.string().min(1)).min(1),
          rows: z.array(z.array(z.string().min(1)).min(1)).min(1),
        }).optional(),
        note: z.string().optional(),
      })).min(1),
      sidebar: z.object({
        ctaTitle: z.string().min(1),
        ctaDescription: z.string().min(1),
        ctaLabel: z.string().min(1),
        ctaHref: z.string().min(1),
        listTitle: z.string().optional(),
        listItems: z.array(z.string().min(1)).optional(),
      }),
    }),
  }),
  z.object({
    id: z.string().min(1),
    type: z.literal('service-directory'),
    data: z.object({
      title: z.string().min(1),
      intro: z.string().min(1),
      imageSrc: z.string().startsWith('/'),
      imageAlt: z.string().min(1),
      serviceIds: z.array(z.number().int().positive().refine((id) => serviceIds.includes(id), {
        message: 'serviceIds harus merujuk ke layanan di src/config/site.ts',
      })).min(1),
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
