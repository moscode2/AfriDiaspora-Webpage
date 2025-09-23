// src/Hooks/useFirestoreData.ts
import { useState, useEffect } from "react";
import { db } from "../data/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export type Article = {
  id: string;
  title: string;
  slug: string;
  author?: string;
  content?: string;
  excerpt?: string;
  featured_image_url?: string;
  published_at?: Date;
  category_id?: string;
  is_featured?: boolean;
  is_trending?: boolean;
  is_breaking?: boolean;
  readCount?: number;
};

export type MultimediaItem = {
  id: string;
  title: string;
  type: "video" | "podcast" | "photo-gallery";
  thumbnail: string;
  duration?: string;
  description?: string;
  url: string;
};

export function useFirestoreData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [multimedia, setMultimedia] = useState<MultimediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- Fetch Articles ---
        const articleSnap = await getDocs(
          query(collection(db, "articles"), orderBy("published_at", "desc"))
        );

        const articlesData: Article[] = articleSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title ?? "Untitled",
            slug: data.slug,
            author: data.author,
            content: data.content,
            excerpt: data.excerpt,
            featured_image_url: data.featured_image_url,
            published_at: data.published_at?.toDate
              ? data.published_at.toDate()
              : new Date(data.published_at ?? Date.now()),
            category_id: data.category_id,
            is_featured: !!data.is_featured,
            is_trending: !!data.is_trending,
            is_breaking: !!data.is_breaking,
            readCount: data.readCount ?? 0,
          };
        });

        setArticles(articlesData);

        // --- Fetch Multimedia ---
        const multimediaSnap = await getDocs(collection(db, "multimedia"));
        const multimediaData: MultimediaItem[] = multimediaSnap.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          type: doc.data().type,
          thumbnail: doc.data().thumbnail,
          duration: doc.data().duration,
          description: doc.data().description,
          url: doc.data().url,
        }));
        setMultimedia(multimediaData);

      } catch (err) {
        console.error("Error fetching Firestore data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Helper Functions ---
  const getFeaturedArticles = () =>
    articles
      .filter((a) => a.is_featured)
      .sort((a, b) => (b.published_at?.getTime() ?? 0) - (a.published_at?.getTime() ?? 0));

  const getTrendingArticles = (limit = 5) =>
    articles
      .filter((a) => a.is_trending)
      .sort((a, b) => (b.published_at?.getTime() ?? 0) - (a.published_at?.getTime() ?? 0))
      .slice(0, limit);

  const getBreakingNews = (limit = 5) =>
    articles
      .filter((a) => a.is_breaking)
      .sort((a, b) => (b.published_at?.getTime() ?? 0) - (a.published_at?.getTime() ?? 0))
      .slice(0, limit);

  return {
    loading,
    featuredArticles: getFeaturedArticles(),
    trendingArticles: getTrendingArticles(),
    breakingNews: getBreakingNews(),
    multimedia,
  };
}
