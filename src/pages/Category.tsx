import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";
import { db } from "../data/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Article, Category } from "../types";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      setLoading(true);

      try {
        // 1️⃣ Find the category
        const catRef = collection(db, "categories");
        const catSnap = await getDocs(query(catRef, where("slug", "==", slug)));

        if (catSnap.empty) {
          setCategory(null);
          setArticles([]);
          setLoading(false);
          return;
        }

        const catDoc = catSnap.docs[0];
        const catData = { 
          id: parseInt(catDoc.id, 10) || Date.now(), // fallback if Firestore id is string
          ...catDoc.data(),
        } as Category;
        setCategory(catData);

        // 2️⃣ Get articles for this category
        const artRef = collection(db, "articles");
        const artSnap = await getDocs(
          query(artRef, where("category_id", "==", catData.slug)) // 🔑 adjust if you're storing string slug instead of number
        );

        const artList: Article[] = artSnap.docs.map((doc) => {
          const raw = doc.data();

          return {
            id: parseInt(doc.id, 10) || Date.now(), // Firestore IDs are strings, force into number
            title: raw.title ?? "Untitled",
            slug: raw.slug ?? doc.id,
            excerpt: raw.excerpt ?? null,
            content: raw.content ?? "",
            featured_image_url: raw.featured_image_url ?? null,
            category_id: raw.category_id ?? null,
            author: raw.author ?? null,
            is_featured: raw.is_featured ?? false,
            published_at: raw.published_at ?? null,
            created_at: raw.created_at ?? new Date().toISOString(),
            updated_at: raw.updated_at ?? new Date().toISOString(),
          };
        });

        setArticles(artList);
      } catch (err) {
        console.error("Error fetching category/articles:", err);
      }

      setLoading(false);
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 text-lg">{category.description}</p>
        )}

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found in this category yet.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
