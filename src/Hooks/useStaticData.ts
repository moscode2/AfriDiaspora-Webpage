import { useState, useEffect } from "react";
import { Article, Category } from "../types";
import { db } from "../data/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export function useStaticData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const staticCategories: Category[] = [
    {
      id: 1, name: "News", slug: "news",
      description: null,
      created_at: "",
      updated_at: ""
    },
    {
      id: 2, name: "Policy & Migration", slug: "policy-migration",
      description: null,
      created_at: "",
      updated_at: ""
    },
    {
      id: 3, name: "Culture & Lifestyles", slug: "culture-lifestyles",
      description: null,
      created_at: "",
      updated_at: ""
    },
    {
      id: 4, name: "Profiles & Voices", slug: "profiles-voices",
      description: null,
      created_at: "",
      updated_at: ""
    },
    {
      id: 5, name: "Travel & Mobility", slug: "travel-mobility",
      description: null,
      created_at: "",
      updated_at: ""
    },
    {
      id: 6, name: "Business & Jobs", slug: "business-jobs",
      description: null,
      created_at: "",
      updated_at: ""
    },
    {
      id: 7, name: "Events", slug: "events",
      description: null,
      created_at: "",
      updated_at: ""
    },
    {
      id: 8, name: "Latest Stories", slug: "latest-stories",
      description: null,
      created_at: "",
      updated_at: ""
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Only published articles, sorted by published_at
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
            published_at: data.published_at?.toDate
              ? data.published_at.toDate().toISOString()
              : null,
            updated_at: data.updated_at?.toDate
              ? data.updated_at.toDate().toISOString()
              : null,
            category: data.category || "Uncategorized",
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

  const normalize = (str: string) =>
    str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  const getArticlesByCategory = (categorySlug: string) => {
    return articles.filter(
      (article) => normalize(article.category) === categorySlug
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
