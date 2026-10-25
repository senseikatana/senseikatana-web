import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().default('Sergio Jurado Casado'),
        published: z.boolean().default(true),
        draft: z.boolean().default(false),
      }),
    }),

    /*
     * Services — the "what I do" grid. Markdown body is the long-form pitch;
     * frontmatter drives the card, the ordering and the detail page.
     */
    services: defineCollection({
      type: 'page',
      source: 'services/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        order: z.number().default(99),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        stack: z.array(z.string()).optional(),
        deliverables: z.array(z.string()).optional(),
      }),
    }),

    /*
     * Works / case studies — separate from blog because these sell work,
     * not ideas. `challenge` + `solution` + `outcome` are the three beats.
     */
    works: defineCollection({
      type: 'page',
      source: 'works/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        client: z.string().optional(),
        sector: z.string().optional(),
        year: z.string().optional(),
        image: z.string().optional(),
        liveUrl: z.string().url().optional(),
        repoUrl: z.string().url().optional(),
        role: z.string().optional(),
        stack: z.array(z.string()).optional(),
        challenge: z.string().optional(),
        solution: z.string().optional(),
        outcome: z.string().optional(),
        metrics: z.array(z.object({
          value: z.string(),
          label: z.string(),
        })).optional(),
        featured: z.boolean().default(false),
        order: z.number().default(99),
        draft: z.boolean().default(false),
      }),
    }),

    /*
     * Testimonials — real, attributable quotes only. `source` records where the
     * quote came from so a claim is never floating free of its provenance.
     */
    testimonials: defineCollection({
      type: 'data',
      source: 'testimonials/**',
      schema: z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
        source: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        link: z.string().url().optional(),
        order: z.number().default(99),
      }),
    }),
  },
})
