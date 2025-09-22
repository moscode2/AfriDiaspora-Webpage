import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Article } from "../types";

// ✅ Safe date formatter
function formatDate(dateInput: unknown): string | null {
  if (!dateInput) return null;

  // Firestore Timestamp object
  if (typeof dateInput.toDate === "function") {
    return dateInput.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // String (ISO or custom)
  if (typeof dateInput === "string") {
    const trimmed = dateInput.trim();
    if (!trimmed) return null;
    const date = new Date(trimmed);
    return isNaN(date.getTime())
      ? trimmed // fallback: show raw string if not a valid date
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  }

  // Fallback
  return String(dateInput);
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  // 🔑 Fallbacks for missing fields
  const slug = article.slug || String(article.id) || "unknown-article";
  const title = article.title || "Untitled Article";
  const excerpt = article.excerpt || "No summary available.";
  const author = article.author || "Unknown Author";
  const publishedAt = formatDate(article.published_at);
  const imageUrl =
    article.featured_image_url ||
    "https://via.placeholder.com/800x450?text=No+Image";
  const category = article.category_id || "Uncategorized";

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
            {/* Category */}
            <span className="inline-block text-sm font-semibold bg-orange-600 px-2 py-1 rounded-full mb-2">
              {category}
            </span>
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
        <div className="aspect-[16/9] overflow-hidden relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category badge */}
          <span className="absolute top-2 left-2 inline-block text-xs font-semibold bg-orange-600 text-white px-2 py-1 rounded-full">
            {category}
          </span>
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
