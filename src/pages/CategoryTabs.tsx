import { Link, useLocation } from "react-router-dom";
import { useStaticData } from "../Hooks/useStaticData";

export default function CategoryTabs() {
  const { categories, loading } = useStaticData();
  const location = useLocation();

  if (loading) return null;

  return (
    <div className="flex space-x-4 overflow-x-auto py-2 px-4 bg-white shadow-sm">
      {categories.map((cat) => {
        const isActive = location.pathname === `/category/${cat.slug}`;
        return (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              isActive
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
