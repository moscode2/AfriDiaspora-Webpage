// src/Hooks/useArticles.ts
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  where,
  limit as limitQ,
  onSnapshot,
  QueryConstraint,
  DocumentData,
} from "firebase/firestore";
import { db } from "../data/firebase";

export interface Article {
  id: string;
  category_id: string;
  author: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  status: string;
  publishedAt?: Date | null;
  views?: number;
  featured?: boolean;
}

export function useArticles(opts?: { category?: string; limit?: number; featured?: boolean }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const { category, featured, limit } = opts || {};

  useEffect(() => {
    setLoading(true);

    const constraints: QueryConstraint[] = [where("status", "==", "published")];

    if (category) constraints.push(where("category_id", "==", category));
    if (featured) constraints.push(where("featured", "==", true));
    if (limit) constraints.push(limitQ(limit));

    // Important: Only orderBy if field exists in Firestore
    constraints.push(orderBy("publishedAt", "desc"));

    const q = query(collection(db, "articles"), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const data: Article[] = snap.docs.map((doc) => {
          const raw = doc.data() as DocumentData;

          return {
            id: doc.id,
            category_id: raw.category_id ?? "",
            author: raw.author ?? "Unknown",
            title: raw.title ?? "Untitled",
            excerpt: raw.excerpt ?? "",
            content: raw.content ?? "",
            featured_image_url: raw.featured_image_url ?? "",
            status: raw.status ?? "draft",
            publishedAt: raw.publishedAt?.toDate?.() ?? null, // ✅ convert Timestamp
            views: raw.views ?? 0,
            featured: raw.featured ?? false,
          };
        });

        setArticles(data);
        setLoading(false);
      },
      (err) => {
        console.error("useArticles snapshot error:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [category, featured, limit]);

  return { articles, loading };
}
