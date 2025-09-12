import { useState, useEffect } from "react";
import { Article, Category } from "../types";
import { db } from "../data/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export function useStaticData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizeDate = (value: unknown) => {
    if (!value) return null;
    if ((value as { toDate?: () => Date }).toDate)
      return (value as { toDate: () => Date }).toDate().toISOString();
    return new Date(value as string).toISOString();
  };

  const normalizeSlug = (str: string | undefined | null) =>
    str ? str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") : "uncategorized";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch categories
        const categoriesSnap = await getDocs(collection(db, "categories"));
        const categoriesData: Category[] = categoriesSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id,
            name: data.name || "Uncategorized",
            slug: data.slug || normalizeSlug(data.name || "uncategorized"),
            description: data.description || null,
            created_at: normalizeDate(data.created_at),
            updated_at: normalizeDate(data.updated_at),
          };
        });
        setCategories(categoriesData);

        // 2️⃣ Fetch articles
        let articleQuery;
        try {
          articleQuery = query(
            collection(db, "articles"),
            where("status", "in", ["published", "Published"]),
            orderBy("published_at", "desc")
          );
        } catch (err) {
          console.warn("⚠️ Falling back to basic query (no orderBy)");
          articleQuery = query(collection(db, "articles"));
        }

        const articleSnap = await getDocs(articleQuery);

        const articlesData: Article[] = articleSnap.docs.map((doc) => {
          const data = doc.data() as Partial<Article>;

          // Match category by ID
          const category = categoriesData.find(
            (c) => c.id.toString() === data.category_id?.toString()
          ) || {
            id: 0,
            name: "uncategorized",
            slug: "uncategorized",
            description: null,
            created_at: "",
            updated_at: "",
          };

          return {
            id: data.id?.toString() || doc.id,
            title: data.title || "Untitled",
            slug: data.slug || normalizeSlug(data.title || "untitled"),
            excerpt: data.excerpt || (data.content ? data.content.slice(0, 150) + "..." : ""),
            content: data.content || "",
            category_id: data.category_id || category.id,
            category: category.name,
            category_name: category.name,
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
        console.log("✅ Loaded categories:", categoriesData);
        console.log("✅ Loaded articles:", articlesData);
      } catch (error) {
        console.error("❌ Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getArticlesByCategory = (categorySlug: string) =>
    articles.filter((article) => article.category_slug === categorySlug);

  const getFeaturedArticles = () =>
    articles.filter((article) => article.is_featured);

  const getArticleBySlug = (slug: string) =>
    articles.find((article) => article.slug === slug) || null;

  return {
    articles,
    categories,
    loading,
    getArticlesByCategory,
    getFeaturedArticles,
    getArticleBySlug,
  };
}
