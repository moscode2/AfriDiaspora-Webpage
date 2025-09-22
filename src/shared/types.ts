import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(), // Firestore doc.id is always string
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const ArticleSchema = z.object({
  id: z.string(), // Firestore doc.id is always string
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string(),
  featured_image_url: z.string().nullable(),
  category_id: z.string().nullable(), // 🔑 was number → now string
  category: z.string().optional(), // resolved category name
  category_slug: z.string().optional(), // resolved slug
  author: z.string().nullable(),
  is_featured: z.boolean().optional().default(false),
  status: z.string().optional().default("draft"), // published/draft
  published_at: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const NewsletterSubscriberSchema = z.object({
  email: z.string().email(),
});

// Inferred TypeScript types
export type Category = z.infer<typeof CategorySchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type NewsletterSubscriber = z.infer<typeof NewsletterSubscriberSchema>;
