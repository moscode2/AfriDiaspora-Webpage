import { useState, useEffect } from "react";
import { Article, Category } from "../types";
import { db } from "../data/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export function useStaticData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizeDate = (value: unknown) => {
    if (!value) return null;
    if (typeof value === "object" && value !== null && "toDate" in value) {
      return (value as { toDate: () => Date }).toDate().toISOString();
    }
    return new Date(value as string).toISOString();
  };

  const normalizeSlug = (str: string | undefined | null) =>
    str ? str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") : "uncategorized";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch categories
        const categoriesSnap = await getDocs(collection(db, "categories"));
        const categoriesData: Category[] = categoriesSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id || doc.id,
            name: data.name || "Uncategorized",
            slug: normalizeSlug(data.slug || data.name),
            description: data.description || null,
            created_at: normalizeDate(data.created_at) || "",
            updated_at: normalizeDate(data.updated_at) || "",
          };
        });
        setCategories(categoriesData);

        // Fetch articles
        let articleQuery;
        try {
          articleQuery = query(
            collection(db, "articles"),
            orderBy("published_at", "desc")
          );
        } catch {
          articleQuery = collection(db, "articles");
        }

        const articleSnap = await getDocs(articleQuery);
        const articlesData: Article[] = articleSnap.docs.map((doc) => {
          const data = doc.data() as Partial<Article>;
          const category =
            categoriesData.find((c) => c.id.toString() === data.category_id?.toString()) ||
            {
              id: 0,
              name: "Uncategorized",
              slug: "uncategorized",
              description: null,
              created_at: "",
              updated_at: "",
            };

          return {
            id: data.id?.toString() || doc.id,
            title: data.title || "Untitled",
            slug: normalizeSlug(data.slug || data.title),
            excerpt:
              data.excerpt || (data.content ? data.content.slice(0, 150) + "..." : ""),
            content: data.content || "",
            category_id: data.category_id || category.id,
            category: category.name,
            category_slug: category.slug,
            is_featured: data.is_featured || false,
            featured_image_url: data.featured_image_url || "",
            created_at: normalizeDate(data.created_at),
            published_at: normalizeDate(data.published_at),
            updated_at: normalizeDate(data.updated_at),
            author: data.author || "Anonymous",
            status: data.status || "draft",
          };
        });

        setArticles(articlesData);
      } catch (err) {
        console.error("❌ Error fetching Firestore data:", err);
        setError("Failed to fetch articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Simple getters (no memoization issues)
  const getArticlesByCategory = (categorySlug: string) =>
    articles.filter(
      (article) => article.category_slug.toLowerCase() === categorySlug.toLowerCase()
    );

  const getFeaturedArticles = () => articles.filter((article) => article.is_featured);

  const getArticleBySlug = (slug: string) =>
    articles.find((article) => article.slug === slug) || null;

  return {
    articles,
    categories,
    loading,
    error,
    getArticlesByCategory,
    getFeaturedArticles,
    getArticleBySlug,
  };
}
