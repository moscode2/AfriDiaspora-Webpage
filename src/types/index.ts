export interface Article {
  category_slug(category_slug: unknown): unknown;
  category: unknown;
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  category_id: number | null;
  author: string | null;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  readTime?: string;   
  timeAgo?: string; 
  status: 'draft' | 'published';
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

/**
 * 👇 New interface for people profiles
 */
export interface Person {
  id: number;
  name: string;            // instead of "title"
  role: string;            // fixes underline issue
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  voice: string;
  timeAgo?: string;
  category_id?: number;
}
