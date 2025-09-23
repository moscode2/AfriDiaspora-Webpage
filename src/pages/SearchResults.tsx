import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { db } from "../data/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Article } from "../Hooks/usefirestoredata";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const queryParam = useQuery().get("query") || "";
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!queryParam.trim()) return;
      setLoading(true);

      try {
        const q = query(
          collection(db, "articles"),
          where("keywords", "array-contains", queryParam.toLowerCase())
        );
        const snapshot = await getDocs(q);
        const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Article[];
        setResults(articles);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [queryParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{queryParam}"
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="space-y-6">
          {results.map((article) => (
            <div key={article.id} className="border-b pb-4">
              <Link
                to={`/article/${article.slug}`}
                className="text-xl font-semibold text-accent hover:underline"
              >
                {article.title}
              </Link>
              <p className="text-gray-600 mt-2">{article.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
