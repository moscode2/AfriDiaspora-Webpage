import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../data/firebase";
import toast from "react-hot-toast";

export default function HeroSettings() {
  const [articles, setArticles] = useState<{ id: string; title: string }[]>([]);
  const [featuredArticleId, setFeaturedArticleId] = useState("");
  const [sidebarImageUrl, setSidebarImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch articles for dropdown
  useEffect(() => {
    async function fetchArticles() {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setArticles(list);
    }

    // Fetch existing hero settings
    async function fetchHeroSettings() {
      const heroDoc = await getDoc(doc(db, "settings", "hero"));
      if (heroDoc.exists()) {
        const data = heroDoc.data();
        setFeaturedArticleId(data.featuredArticleId || "");
        setSidebarImageUrl(data.sidebarImageUrl || "");
      }
    }

    fetchArticles();
    fetchHeroSettings();
  }, []);

  // Save changes
  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "settings", "hero"), {
        featuredArticleId,
        sidebarImageUrl,
      });
      toast.success("Hero settings updated!");
    } catch (error) {
      console.error("Save hero settings error:", error);
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Hero Settings</h1>

      {/* Featured Article */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Featured Article
        </label>
        <select
          value={featuredArticleId}
          onChange={(e) => setFeaturedArticleId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
        >
          <option value="">-- Select an Article --</option>
          {articles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.title}
            </option>
          ))}
        </select>
      </div>

      {/* Sidebar Image */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Sidebar Image URL
        </label>
        <input
          type="text"
          value={sidebarImageUrl}
          onChange={(e) => setSidebarImageUrl(e.target.value)}
          placeholder="https://example.com/sidebar.jpg"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
        />
        {sidebarImageUrl && (
          <img
            src={sidebarImageUrl}
            alt="Sidebar Preview"
            className="mt-2 w-full h-60 object-cover rounded-lg shadow"
          />
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white font-medium rounded-md shadow hover:bg-orange-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}
