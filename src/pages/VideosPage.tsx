// src/pages/VideosPage.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Video {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  duration?: string;
  type?: string;
  status: "draft" | "published";
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const snap = await getDocs(collection(db, "videos"));
        const list: Video[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Video),
        }));
        setVideos(list.filter((v) => v.status === "published"));
      } catch (err) {
        console.error("Error loading videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Videos</h1>

        {loading ? (
          <p>Loading...</p>
        ) : videos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                {/* Thumbnail */}
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Thumbnail</span>
                  </div>
                )}

                {/* Info */}
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2">{video.title}</h2>
                  {video.duration && (
                    <p className="text-sm text-gray-500 mb-2">
                      Duration: {video.duration}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {video.description}
                  </p>

                  {/* Video player */}
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded"
                      src={video.url.replace("watch?v=", "embed/")}
                      title={video.title}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No published videos yet.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
