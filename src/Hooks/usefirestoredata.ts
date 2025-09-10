// src/Hooks/useFirestoreData.ts
import { useState, useEffect } from "react";
import { db } from "../data/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// Types
export type Article = {
  id: string;
  title: string;
  slug: string;
  author?: string;
  content?: string;
  excerpt?: string;
  featured_image_url?: string;
  published_at?: string | Date;
  category_id?: string;
  is_featured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export function useFirestoreData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch articles ordered by published date
        const articleQuery = query(
          collection(db, "articles"),
          orderBy("published_at", "desc")
        );
        const articleSnap = await getDocs(articleQuery);
        const articlesData: Article[] = articleSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled",
            slug: data.slug,
            author: data.author,
            content: data.content,
            excerpt: data.excerpt,
            featured_image_url: data.featured_image_url,
            published_at: data.published_at?.toDate
              ? data.published_at.toDate()
              : data.published_at,
            category_id: data.category_id,
            is_featured: data.is_featured || false,
          };
        });

        setArticles(articlesData);

        // Fetch categories
        const categorySnap = await getDocs(collection(db, "categories"));
        const categoriesData: Category[] = categorySnap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          slug: doc.data().slug,
        }));

        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching Firestore data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helpers
  const getArticlesByCategory = (slug: string) => {
    const category = categories.find((c) => c.slug === slug);
    if (!category) return [];
    return articles.filter((a) => a.category_id === category.id);
  };

  const getArticleBySlug = (slug: string) => {
    return articles.find((a) => a.slug === slug) || null;
  };

  const getFeaturedArticles = () => {
    return articles.filter((a) => a.is_featured);
  };

  return {
    articles,
    categories,
    loading,
    getArticlesByCategory,
    getArticleBySlug,
    getFeaturedArticles,
  };
}
