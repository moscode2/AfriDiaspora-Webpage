// src/types.ts
import { z } from "zod";
import { Timestamp } from "firebase/firestore";

// ✅ Category schema
export const CategorySchema = z.object({
  id: z.string(), // Firestore doc.id is always string
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  created_at: z.union([z.instanceof(Timestamp), z.string(), z.null()]),
  updated_at: z.union([z.instanceof(Timestamp), z.string(), z.null()]),
});

// ✅ Article schema with Firestore Timestamp support
export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string(),
  featured_image_url: z.string().nullable().optional(),
  category_id: z.string().nullable(), // relation by ID
  category: z.string().optional(), // resolved category name
  category_slug: z.string().optional(), // resolved slug
  author: z.string().nullable(),
  is_featured: z.boolean().optional().default(false),
  status: z.string().optional().default("draft"), // published/draft
  published_at: z.union([z.instanceof(Timestamp), z.string(), z.null()]), // ✅ Timestamp or string
  created_at: z.union([z.instanceof(Timestamp), z.string(), z.null()]),
  updated_at: z.union([z.instanceof(Timestamp), z.string(), z.null()]),
});

// ✅ Newsletter subscribers
export const NewsletterSubscriberSchema = z.object({
  email: z.string().email(),
});

// ✅ Inferred TypeScript types
export type Category = z.infer<typeof CategorySchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type NewsletterSubscriber = z.infer<typeof NewsletterSubscriberSchema>;
