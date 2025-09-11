import { useState, useEffect } from "react";
import { Article } from "../types";
import { db } from "../data/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

export function useStaticData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Define categories manually (since you’re not saving them in Firestore)
  const categories = [
    { id: "news", name: "News", slug: "news" },
    { id: "policy-and-migration", name: "Policy & Migration", slug: "policy-and-migration" },
    { id: "culture-and-lifestyles", name: "Culture & Lifestyles", slug: "culture-and-lifestyles" },
    { id: "profiles-and-voices", name: "Profiles & Voices", slug: "profiles-and-voices" },
    { id: "travel-and-mobility", name: "Travel & Mobility", slug: "travel-and-mobility" },
    { id: "business-and-jobs", name: "Business & Jobs", slug: "business-and-jobs" },
    { id: "events", name: "Events", slug: "events" },
    { id: "latest-stories", name: "Latest Stories", slug: "latest-stories" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleQuery = query(
          collection(db, "articles"),
          where("status", "==", "published"),
          orderBy("created_at", "desc")
        );
        const articleSnap = await getDocs(articleQuery);

        const articlesData: Article[] = articleSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            created_at: data.created_at?.toDate
              ? data.created_at.toDate().toISOString()
              : data.created_at,
            category: data.category, // ✅ use category string
          } as unknown as Article;
        });

        setArticles(articlesData);
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
      (article) =>
        article.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") === category.slug
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
