import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../data/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace spaces & special chars with "-"
    .replace(/(^-|-$)+/g, "");   // remove leading/trailing "-"
}

// ✅ categories with both name + slug
const categories = [
  { name: "News", slug: "news" },
  { name: "Policy & Migration", slug: "policy-migration" },
  { name: "Culture & Lifestyles", slug: "culture-lifestyles" },
  { name: "Profiles & Voices", slug: "profiles-voices" },
  { name: "Travel & Mobility", slug: "travel-mobility" },
  { name: "Business & Jobs", slug: "business-jobs" },
  { name: "Events", slug: "events" },
  { name: "Latest Stories", slug: "latest-stories" },
];

export default function NewArticle() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [category, setCategory] = useState(categories[0].slug); // default slug
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      const slug = slugify(title);
      const categoryData = categories.find((c) => c.slug === category);
      const now = Timestamp.now();

      await addDoc(collection(db, "articles"), {
        title,
        content,
        slug,
        status,
        category_name: categoryData?.name || "",
        category_slug: categoryData?.slug || "",
        created_at: now,
        updated_at: now,                            // ✅ added
        published_at: status === "published" ? now : null, // ✅ added
      });

      toast.success("Article created!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("create article error:", err);
      toast.error("Failed to create article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 bg-orange-600 text-white font-medium rounded-md shadow hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Article"}
        </button>
      </form>
    </div>
  );
}
