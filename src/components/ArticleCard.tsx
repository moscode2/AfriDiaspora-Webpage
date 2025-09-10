import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Article } from "../types";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ✅ Fallback values
  const slug = article.slug || article.id || "unknown-article";
  const title = article.title || "Untitled Article";
  const excerpt = article.excerpt || "No summary available.";
  const author = article.author || "Unknown Author";
  const publishedAt = article.published_at ? formatDate(article.published_at) : null;
  const imageUrl =
    article.featured_image_url ||
    "https://via.placeholder.com/800x450?text=No+Image";

  if (featured) {
    return (
      <Link to={`/article/${slug}`} className="group block">
        <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[16/9]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 group-hover:text-orange-300 transition-colors">
              {title}
            </h2>
            <p className="text-gray-200 text-lg mb-3 line-clamp-2">{excerpt}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>By {author}</span>
              {publishedAt && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{publishedAt}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${slug}`} className="group block">
      <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>By {author}</span>
            {publishedAt && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{publishedAt}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
