import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../data/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default function ArticleForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // If editing

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    featured_image_url: "",
  });
  const [loading, setLoading] = useState(false);

  // If editing, fetch existing article
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      const docRef = doc(db, "articles", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setForm(snap.data() as typeof form);
      }
    };
    fetchArticle();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Auto-generate slug when title changes
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
    }));
  }, [form.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Update existing article
        const docRef = doc(db, "articles", id);
        await updateDoc(docRef, {
          ...form,
          updated_at: serverTimestamp(),
        });
      } else {
        // Create new article
        await addDoc(collection(db, "articles"), {
          ...form,
          published_at: new Date().toISOString(),
          created_at: serverTimestamp(),
        });
      }

      navigate("/admin/dashboard"); // Redirect after save
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Error saving article. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Article" : "New Article"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="featured_image_url"
          placeholder="Featured Image URL"
          value={form.featured_image_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="excerpt"
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <textarea
          name="content"
          placeholder="Full Content (HTML or plain text)"
          value={form.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={10}
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          {loading ? "Saving..." : "Save Article"}
        </button>
      </form>
    </div>
  );
}
