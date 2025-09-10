import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string(),
  featured_image_url: z.string().nullable(),
  category_id: z.number().nullable(),
  author: z.string().nullable(),
  is_featured: z.boolean(),
  published_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const NewsletterSubscriberSchema = z.object({
  email: z.string().email(),
});

// Inferred TypeScript types
export type Category = z.infer<typeof CategorySchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type NewsletterSubscriber = z.infer<typeof NewsletterSubscriberSchema>;
