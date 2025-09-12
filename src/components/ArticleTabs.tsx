import { useState } from "react";
import { useStaticData } from "../Hooks/useStaticData";
import ArticleCard from "./ArticleCard";

export default function ArticlesTabs() {
const { articles, categories, loading } = useStaticData();
const [activeCategory, setActiveCategory] = useState("all");

const normalizeSlug = (str: string | undefined | null) =>
    str ? str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") : "uncategorized";

const handleTabClick = (slug: string) => setActiveCategory(slug);

const filteredArticles =
    activeCategory === "all"
        ? articles
        : articles.filter((a) => normalizeSlug(a.category_slug as string) === normalizeSlug(activeCategory));

if (loading) return <p>Loading articles...</p>;

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleTabClick("all")}
          className={activeCategory === "all" ? "bg-orange-600 text-white px-4 py-2 rounded" : "bg-gray-200 px-4 py-2 rounded"}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleTabClick(cat.slug)}
            className={activeCategory === cat.slug ? "bg-orange-600 text-white px-4 py-2 rounded" : "bg-gray-200 px-4 py-2 rounded"}
          >
            {cat.name || "Uncategorized"}
          </button>
        ))}
      </div>

      {/* Articles */}
      {filteredArticles.length === 0 ? (
        <p>No articles in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
