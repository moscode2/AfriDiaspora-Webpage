import { useState, useEffect } from "react";
import { Article, Category } from "../types";
import { db } from "../data/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { mockArticles, mockCategories } from "../data/mockData";

export function useStaticData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // ✅ If in dev mode → use mock data
      if (process.env.NODE_ENV === "development") {
        console.warn("⚠️ Using mock data (development mode)");
        setArticles(mockArticles);
        setCategories(mockCategories);
        setLoading(false);
        return;
      }

      // ✅ Otherwise → fetch from Firebase
      try {
        const articleQuery = query(
          collection(db, "articles"),
          orderBy("published_at", "desc")
        );
        const articleSnap = await getDocs(articleQuery);

        const articlesData: Article[] = articleSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            published_at: data.published_at?.toDate
              ? data.published_at.toDate().toISOString()
              : data.published_at,
            category_id: String(data.category_id),
          } as unknown as Article;
        });

        const categorySnap = await getDocs(collection(db, "categories"));
        const categoriesData: Category[] = categorySnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: String(doc.id),
            ...data,
          } as unknown as Category;
        });

        setArticles(articlesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("❌ Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helpers
  const getArticlesByCategory = (categorySlug: string) => {
    const category = categories.find((cat) => cat.slug === categorySlug);
    if (!category) return [];
    return articles.filter(
      (article) => String(article.category_id) === String(category.id)
    );
  };

  const getFeaturedArticles = () => {
    return articles.filter((article) => article.is_featured);
  };

  const getArticleBySlug = (slug: string) => {
    return articles.find((article) => article.slug === slug) || null;
  };

  return {
    articles,
    categories,
    loading,
    getArticlesByCategory,
    getFeaturedArticles,
    getArticleBySlug,
  };
}
