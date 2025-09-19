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
import i18n from "../i18n";

export interface Article {
  id: string;
  category?: string;
  publishedAt?: string;
  thumbnail?: string;
  featured?: boolean;
  views?: number;
  title: string;
  excerpt: string;
  body?: string;
}

/**
 * useArticles - real-time hook pulling Firestore "articles" collection.
 * - opts.category: filter by category
 * - opts.limit: number
 * - opts.featured: boolean
 *
 * Listens for i18n.language and returns translated article fields
 */
export function useArticles(opts?: { category?: string; limit?: number; featured?: boolean }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const constraints: QueryConstraint[] = [orderBy("publishedAt", "desc")];

    if (opts?.category) constraints.push(where("category", "==", opts.category));
    if (opts?.featured) constraints.push(where("featured", "==", true));
    if (opts?.limit) constraints.push(limitQ(opts.limit));

    const q = query(collection(db, "articles"), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const lang = i18n.language || "en";

        const data: Article[] = snap.docs.map((doc) => {
          const raw = doc.data() as DocumentData;
          const t = raw.translations || {};
          const trans = t[lang] ?? t["en"] ?? {};

          return {
            id: doc.id,
            category: raw.category ?? "",
            publishedAt: raw.publishedAt ?? "",
            thumbnail: raw.thumbnail ?? "",
            featured: !!raw.featured,
            views: raw.views ?? 0,
            title: trans.title ?? "Untitled",
            excerpt: trans.excerpt ?? "",
            body: trans.body ?? "",
          } as Article;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts?.category, opts?.featured, opts?.limit, i18n.language]);

  return { articles, loading };
}
