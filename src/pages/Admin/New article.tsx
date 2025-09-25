import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../data/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Slug generator
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace spaces & special chars
    .replace(/(^-|-$)+/g, "");   // remove leading/trailing "-"
}

// Categories
const categories = [
  { id: 1, name: "African News", slug: "african-news" },
  { id: 2, name: "Europe News", slug: "europe-news" },
  { id: 3, name: "Diaspora Voices", slug: "diaspora-voices" },
  { id: 4, name: "Opinion", slug: "opinion" },
  { id: 5, name: "Business & Economy", slug: "business-economy" },
  { id: 6, name: "Culture & Travel", slug: "culture-travel" },
];

export default function NewArticle() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [category, setCategory] = useState(categories[0].id);
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  // Featured image (main thumbnail)
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");

  // Multiple images
  const [images, setImages] = useState<string[]>([]);

  // Video links
  const [videos, setVideos] = useState<string[]>([]);

  // Flags
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);

  const handleAddImage = () => setImages([...images, ""]);
  const handleImageChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const handleAddVideo = () => setVideos([...videos, ""]);
  const handleVideoChange = (index: number, value: string) => {
    const updated = [...videos];
    updated[index] = value;
    setVideos(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) {
      toast.error("Title, content, and author are required");
      return;
    }

    setLoading(true);
    try {
      const slug = slugify(title);
      const categoryData = categories.find((c) => c.id === category);
      const now = Timestamp.now();
      const excerpt =
        content.length > 150 ? content.slice(0, 150) + "..." : content;

      await addDoc(collection(db, "articles"), {
        title,
        content,
        slug,
        status,
        category_id: categoryData?.id || 0,
        category_name: categoryData?.name || "",
        category_slug: categoryData?.slug || "",
        created_at: now,
        updated_at: now,
        published_at: status === "published" ? now : null,
        author,
        excerpt,
        featured_image_url: featuredImageUrl || "",
        images: images.filter((i) => i.trim() !== ""),
        videos: videos.filter((v) => v.trim() !== ""),
        is_featured: isFeatured,
        is_trending: isTrending,
        is_breaking: isBreaking,
      });

      toast.success("Article created successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Create article error:", err);
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author's name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            required
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
          <input
            type="text"
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          />
          {featuredImageUrl && (
            <img
              src={featuredImageUrl}
              alt="Preview"
              className="mt-2 w-full max-h-64 object-cover rounded"
            />
          )}
        </div>

        {/* Extra Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Images</label>
          {images.map((img, idx) => (
            <input
              key={idx}
              type="text"
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
              placeholder="https://example.com/extra-photo.jpg"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add another image
          </button>
        </div>

        {/* Videos */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Video URLs</label>
          {videos.map((vid, idx) => (
            <input
              key={idx}
              type="text"
              value={vid}
              onChange={(e) => handleVideoChange(idx, e.target.value)}
              placeholder="https://youtube.com/..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddVideo}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add another video
          </button>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Flags */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isTrending}
              onChange={(e) => setIsTrending(e.target.checked)}
            />
            Trending
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isBreaking}
              onChange={(e) => setIsBreaking(e.target.checked)}
            />
            Breaking
          </label>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "draft" | "published")
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
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
