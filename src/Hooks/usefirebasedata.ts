import { useEffect, useState } from "react";
import { db } from "../data/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category_id: string;
  category: string;
  slug: string;
  featured_image_url?: string;
  publishedAt: string;
  readTime?: string;
  author?: string;
}

export function useFirebaseData() {
  const [featuredStories, setFeaturedStories] = useState<Article[]>([]);
  const [categoryNews, setCategoryNews] = useState<Record<string, Article[]>>({});
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [multimediaItems, setMultimediaItems] = useState<unknown[]>([]);
  const [breakingNews, setBreakingNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Featured Stories
        const featuredSnap = await getDocs(
          query(collection(db, "articles"), where("is_featured", "==", true), orderBy("published_at", "desc"))
        );
        setFeaturedStories(featuredSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Article)));

        // Categories
        const categorySnap = await getDocs(collection(db, "articles"));
        const tempCategoryNews: Record<string, Article[]> = {};
        categorySnap.docs.forEach((doc) => {
          const data = doc.data() as Article;
          const catKey = data.category_id;
          if (!tempCategoryNews[catKey]) tempCategoryNews[catKey] = [];
          tempCategoryNews[catKey].push({ id: doc.id, ...data });
        });
        setCategoryNews(tempCategoryNews);

        // Trending articles
        const trendingSnap = await getDocs(
          query(collection(db, "articles"), orderBy("read_count", "desc"), orderBy("published_at", "desc"),)
        );
        setTrendingArticles(trendingSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Article)));

        // Multimedia
        const multimediaSnap = await getDocs(collection(db, "multimedia"));
        setMultimediaItems(multimediaSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        // Breaking News
        const breakingSnap = await getDocs(
          query(collection(db, "articles"), where("is_breaking", "==", true), orderBy("published_at", "desc"))
        );
        setBreakingNews(breakingSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Article)));
      } catch (err) {
        console.error("Firebase fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { featuredStories, categoryNews, trendingArticles, multimediaItems, breakingNews, loading };
}
