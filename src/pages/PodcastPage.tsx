// src/pages/PodcastsPage.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Podcast {
  id: string;
  title: string;
  url: string;
  status: "draft" | "published";
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const snap = await getDocs(collection(db, "podcasts"));
        const list: Podcast[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Podcast),
        }));
        setPodcasts(list.filter((p) => p.status === "published"));
      } catch (err) {
        console.error("Error loading podcasts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Podcasts</h1>
        {loading ? (
          <p>Loading...</p>
        ) : podcasts.length > 0 ? (
          <div className="space-y-6">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="border rounded-lg p-4 shadow">
                <h2 className="font-semibold mb-2">{podcast.title}</h2>
                <audio controls className="w-full">
                  <source src={podcast.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        ) : (
          <p>No published podcasts yet.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
