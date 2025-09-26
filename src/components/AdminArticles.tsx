
import { useState } from "react";
import { deleteArticle } from "../lib/deleteArticles";

interface Article {
  id: string | number;
  title: string;
}

interface AdminArticlesProps {
  initialArticles: Article[];
}

export default function AdminArticles({ initialArticles }: AdminArticlesProps) {
  const [articles, setArticles] = useState(initialArticles);

  const handleDelete = (id: string | number) => {
    deleteArticle({
      articleId: id,
      onDeleted: (deletedId) => {
        // filter safely for string or number
        setArticles((prev) =>
          prev.filter((a) => a.id.toString() !== deletedId)
        );
      },
    });
  };

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <div key={article.id} className="flex justify-between items-center p-4 border rounded">
          <span>{article.title}</span>
          <button
            onClick={() => handleDelete(article.id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
