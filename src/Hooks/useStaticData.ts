import { useState, useEffect } from "react";
import { Article, Category } from "../types";
import { db } from "../data/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export function useStaticData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const staticCategories: Category[] = [
    { id: 1, name: "News", slug: "news", description: null, created_at: "", updated_at: "" },
    { id: 2, name: "Policy & Migration", slug: "policy-and-migration", description: null, created_at: "", updated_at: "" },
    { id: 3, name: "Culture & Lifestyles", slug: "culture-and-lifestyles", description: null, created_at: "", updated_at: "" },
    { id: 4, name: "Profiles & Voices", slug: "profiles-and-voices", description: null, created_at: "", updated_at: "" },
    { id: 5, name: "Travel & Mobility", slug: "travel-and-mobility", description: null, created_at: "", updated_at: "" },
    { id: 6, name: "Business & Jobs", slug: "business-and-jobs", description: null, created_at: "", updated_at: "" },
    { id: 7, name: "Events", slug: "events", description: null, created_at: "", updated_at: "" },
    { id: 8, name: "Latest Stories", slug: "latest-stories", description: null, created_at: "", updated_at: "" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Only fetch published articles, sorted by published_at
        const articleQuery = query(
          collection(db, "articles"),
          where("status", "==", "published"),
          orderBy("published_at", "desc")
        );
        const articleSnap = await getDocs(articleQuery);

        const articlesData: Article[] = articleSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // normalize timestamps
            created_at: data.created_at?.toDate ? data.created_at.toDate().toISOString() : null,
            published_at: data.published_at?.toDate ? data.published_at.toDate().toISOString() : null,
            updated_at: data.updated_at?.toDate ? data.updated_at.toDate().toISOString() : null,
            // ✅ match with saved structure
            category_name: data.category_name || "Uncategorized",
            category_slug: data.category_slug || "uncategorized",
          } as unknown as Article;
        });

        setArticles(articlesData);
        setCategories(staticCategories);
      } catch (error) {
        console.error("❌ Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ normalize slug helper
  const normalize = (str: string) =>
    str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  // ✅ get articles by category slug
  const getArticlesByCategory = (categorySlug: string) => {
    return articles.filter(
      (article) => normalize(article.category_slug as unknown as string) === categorySlug
    );
  };

  // ✅ get featured
  const getFeaturedArticles = () => {
    return articles.filter((article) => article.is_featured);
  };

  // ✅ get article by slug
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
