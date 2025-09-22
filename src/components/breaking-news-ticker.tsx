import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

interface BreakingNewsItem {
  id: string;
  title: string;
  slug: string;
}

interface BreakingNewsTickerProps {
  articles: BreakingNewsItem[];
  autoRotate?: boolean;
  interval?: number;
}

export function BreakingNewsTicker({ 
  articles, 
  autoRotate = true, 
  interval = 4000 
}: BreakingNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoRotate || articles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [articles.length, autoRotate, interval]);

  if (articles.length === 0) return null;

  return (
    <div className="bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-2">
          <div className="flex items-center gap-2 bg-red-700 px-3 py-1 rounded-sm text-sm font-semibold">
            <Clock className="h-3 w-3" />
            BREAKING
          </div>
          <div className="flex-1 ml-4 overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {articles.map((article, index) => (
                <div key={article.id} className="min-w-full">
                  <Link
                    to={`/article/${article.slug}`}
                    className="block text-sm hover:underline truncate"
                  >
                    {article.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-1 ml-4">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-red-400"
                }`}
                aria-label={`Go to breaking news ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}