import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Article } from "../Hooks/usefirestoredata";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// normalize text
function normalize(str: string) {
  return str.toLowerCase().replace(/\s+/g, " ").trim();
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
        const snapshot = await getDocs(collection(db, "articles"));
        const articles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Article[];

        console.log("Articles from Firestore:", articles);
        console.log("Search query:", queryParam);

        const q = normalize(queryParam);
        const qWords = q.split(" "); // split into words

        const filtered = articles.filter((article) => {
          const haystack = normalize(
            `${article.title || ""} ${article.excerpt || ""} ${article.content || ""} ${article.category_name || ""}`
          );
          return qWords.every((word) => haystack.includes(word));
        });

        setResults(filtered);
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
