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
        let articleQuery;
        try {
          // ✅ primary query: published + order by published_at
          articleQuery = query(
            collection(db, "articles"),
            where("status", "in", ["published", "Published"]),
            orderBy("published_at", "desc")
          );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          console.warn("⚠️ Falling back to basic query (no published_at order)");
          articleQuery = query(collection(db, "articles"));
        }

        const articleSnap = await getDocs(articleQuery);
        console.log("🔥 Firestore returned", articleSnap.size, "docs");

        const normalizeDate = (value: unknown) => {
          if (!value) return null;
          if ((value as { toDate?: () => Date }).toDate)
            return (value as { toDate: () => Date }).toDate().toISOString();
          return new Date(value as string).toISOString();
        };

        const articlesData: Article[] = articleSnap.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
            created_at: normalizeDate(data.created_at),
            published_at: normalizeDate(data.published_at),
            updated_at: normalizeDate(data.updated_at),
            category_name: data.category_name || data.category || "Uncategorized",
            category_slug:
              data.category_slug ||
              (data.category
                ? data.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                : "uncategorized"),
          } as unknown as Article;
        });

        setArticles(articlesData);
        setCategories(staticCategories);
        console.log("✅ Loaded articles:", articlesData);
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
      (article) => normalize(article.category_slug as unknown as string) === categorySlug
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
