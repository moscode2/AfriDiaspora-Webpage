// src/pages/Category.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";
import { Article } from "../types";

type ArticleWithId = Article & { id: string };

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<ArticleWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "articles"),
          where("category_slug", "==", slug),
          where("status", "==", "published")
        );

        const snapshot = await getDocs(q);
        const data: ArticleWithId[] = snapshot.docs.map((doc) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...d } = doc.data() as Article; // Destructure to exclude id
          return { id: doc.id, ...d }; // Use doc.id directly
        });

        if (!cancelled) setArticles(data as ArticleWithId[]); // Cast to ArticleWithId[]
      } catch (err) {
        console.error("Error fetching category articles:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchArticles();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </h1>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
