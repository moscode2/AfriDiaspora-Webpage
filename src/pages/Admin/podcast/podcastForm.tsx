// src/pages/Admin/podcasts/PodcastForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../data/firebase";
import toast from "react-hot-toast";

export default function PodcastForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // For edit

  // State
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(false);

  // Fetch podcast if editing
  useEffect(() => {
    if (!id) return;
    const fetchPodcast = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "podcasts", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setTitle(data.title || "");
          setUrl(data.url || "");
          setDescription(data.description || "");
          setThumbnail(data.thumbnail || "");
          setDuration(data.duration || "");
          setStatus(data.status || "draft");
        } else {
          toast.error("Podcast not found");
          navigate("/admin/dashboard");
        }
      } catch (err) {
        console.error("Fetch podcast error:", err);
        toast.error("Failed to fetch podcast");
      } finally {
        setLoading(false);
      }
    };
    fetchPodcast();
  }, [id, navigate]);

  // Save podcast
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !description) return toast.error("Please fill all required fields");
    setLoading(true);

    const podcastData = {
      title,
      url,
      description,
      thumbnail,
      duration,
      status,
      type: "podcast",
      created_at: Timestamp.now(),
    };

    try {
      if (id) {
        await updateDoc(doc(db, "podcasts", id), podcastData);
        toast.success("Podcast updated!");
      } else {
        await addDoc(collection(db, "podcasts"), podcastData);
        toast.success("Podcast added!");
      }
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Save podcast error:", err);
      toast.error("Failed to save podcast");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-xl font-bold mb-4">{id ? "Edit Podcast" : "Add Podcast"}</h1>

      {loading && <p className="mb-4 text-gray-500">Loading...</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* URL */}
        <div>
          <label className="block mb-1 font-medium">Podcast URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={3}
            required
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block mb-1 font-medium">Thumbnail URL</label>
          <input
            type="url"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">Duration (e.g., 45:30)</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          disabled={loading}
        >
          {id ? "Update Podcast" : "Add Podcast"}
        </button>
      </form>
    </div>
  );
}
