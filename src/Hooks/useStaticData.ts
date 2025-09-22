import { useState, useEffect } from "react";
import { db } from "../data/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { Article, Category } from "../types";

export function useStaticData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Categories
        const catSnap = await getDocs(collection(db, "categories"));
        const categoriesData: Category[] = catSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // keep string
            name: data.name || "Uncategorized",
            slug: (data.slug || data.name || "uncategorized").toLowerCase(),
            description: data.description || null,
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
          };
        });
        setCategories(categoriesData);

        // 2️⃣ Articles
        let q;
        try {
          q = query(
            collection(db, "articles"),
            where("status", "==", "published"),
            orderBy("title", "asc") // 🔑 use a field that exists
          );
        } catch {
          q = collection(db, "articles");
        }

        const artSnap = await getDocs(q);
        const articlesData: Article[] = artSnap.docs.map((doc) => {
          const data = doc.data();
          const category =
            categoriesData.find((c) => c.slug === data.category_id) || {
              id: "0",
              name: "Uncategorized",
              slug: "uncategorized",
              description: null,
              created_at: "",
              updated_at: "",
            };

          return {
            id: doc.id,
            title: data.title || "Untitled",
            slug: (data.slug || data.title || "untitled")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-"),
            excerpt: data.excerpt || "",
            content: data.content || "",
            featured_image_url: data.featured_image_url || "",
            category_id: data.category_id,
            category: category.name,
            category_slug: category.slug,
            is_featured: !!data.is_featured,
            author: data.author || "Anonymous",
            status: data.status || "draft",
            published_at: data.published_at || null,
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
          };
        });

        setArticles(articlesData);
      } catch (err) {
        console.error("❌ Error fetching Firestore data:", err);
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { articles, categories, loading, error };
}
