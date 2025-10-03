// src/pages/admin/Dashboard.tsx
import { JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  LogOut,
  BarChart3,
  Mail,
  Users,
  FileText,
  Video,
  Headphones,
} from "lucide-react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  QuerySnapshot,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../../data/firebase";
import toast, { Toaster } from "react-hot-toast";

type ContentDoc = {
  id: string;
  title?: string;
  url?: string;
  status?: "draft" | "published" | string;
  created_at?: Timestamp | string | null;
} & DocumentData;

type ContactMessageDoc = {
  id: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  is_read?: boolean;
  created_at?: Timestamp | string | null;
  [k: string]: unknown;
};

type SubscriberDoc = {
  id: string;
  email?: string;
  is_active?: boolean;
  created_at?: Timestamp | string | null;
  [k: string]: unknown;
};

function mapSnapshotToDocs<T extends { id: string }>(
  snap: QuerySnapshot<DocumentData>
): T[] {
  return snap.docs.map((d) => {
    const data = d.data();
    return { id: d.id, ...data } as T;
  });
}

function formatDate(value: unknown): string {
  if (!value) return "—";
  if (value instanceof Timestamp) return value.toDate().toLocaleString();
  if (typeof value === "string" || value instanceof String) {
    const dt = new Date(String(value));
    return isNaN(dt.getTime()) ? String(value) : dt.toLocaleString();
  }
  if (value instanceof Date) return value.toLocaleString();
  return String(value);
}

export default function AdminDashboard(): JSX.Element {
  const [articles, setArticles] = useState<ContentDoc[]>([]);
  const [videos, setVideos] = useState<ContentDoc[]>([]);
  const [podcasts, setPodcasts] = useState<ContentDoc[]>([]);
  const [messages, setMessages] = useState<ContactMessageDoc[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [activeTab, setActiveTab] = useState<
    "articles" | "videos" | "podcasts" | "messages" | "subscribers"
  >("articles");

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const articlesSnap = await getDocs(query(collection(db, "articles"), orderBy("created_at", "desc")));
      setArticles(mapSnapshotToDocs<ContentDoc>(articlesSnap));

      const videosSnap = await getDocs(query(collection(db, "videos"), orderBy("created_at", "desc")));
      setVideos(mapSnapshotToDocs<ContentDoc>(videosSnap));

      const podcastsSnap = await getDocs(query(collection(db, "podcasts"), orderBy("created_at", "desc")));
      setPodcasts(mapSnapshotToDocs<ContentDoc>(podcastsSnap));

      const messagesSnap = await getDocs(query(collection(db, "contact_messages"), orderBy("created_at", "desc")));
      setMessages(mapSnapshotToDocs<ContactMessageDoc>(messagesSnap));

      const subsSnap = await getDocs(query(collection(db, "newsletter_subscribers"), orderBy("created_at", "desc")));
      setSubscribers(mapSnapshotToDocs<SubscriberDoc>(subsSnap));
    } catch (err) {
      console.error("fetchAll error:", err);
      toast.error("Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out");
    } catch (err) {
      console.error("signOut error:", err);
      toast.error("Failed to sign out");
    }
  };

  const handleDeleteContent = async (collectionName: string, id: string, setState: any) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      setState((prev: ContentDoc[]) => prev.filter((c) => c.id !== id));
      toast.success("Deleted successfully");
    } catch (err) {
      console.error("deleteContent error:", err);
      toast.error("Failed to delete");
    }
  };

  const handleToggleStatus = async (collectionName: string, id: string, current: string | undefined, setState: any) => {
    const newStatus = current === "published" ? "draft" : "published";
    try {
      await updateDoc(doc(db, collectionName, id), { status: newStatus });
      setState((prev: ContentDoc[]) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      toast.success(`Marked ${newStatus}`);
    } catch (err) {
      console.error("toggleStatus error:", err);
      toast.error("Failed to update status");
    }
  };

  const getStatusClasses = (status?: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderTable = (items: ContentDoc[], collectionName: string, setState: any) => {
    const filteredItems = items.filter((a) => {
      const title = (a.title || "").toLowerCase();
      const matchesSearch = title.includes(searchTerm.trim().toLowerCase());
      const matchesFilter = filterStatus === "all" || a.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    return (
      <div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" aria-hidden />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft")}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <Link
              to={`/admin/${collectionName}/new`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New {collectionName.charAt(0).toUpperCase() + collectionName.slice(1, -1)}
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(item.status)}`}>{item.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(item.created_at)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/admin/${collectionName}/edit/${item.id}`}
                        className="text-orange-600 hover:text-orange-900 inline-flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        <span className="sr-only">Edit</span>
                      </Link>

                      <button
                        onClick={() => handleToggleStatus(collectionName, item.id, item.status, setState)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => handleDeleteContent(collectionName, item.id, setState)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-6 text-center text-gray-500">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/images/Logo.png" alt="Logo" className="h-16 w-auto mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <Eye className="h-5 w-5 mr-2" /> View site
            </Link>
            <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5 mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* stats */}
        <section className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <FileText className="h-6 w-6 text-orange-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Articles</p>
              <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <Video className="h-6 w-6 text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-gray-900">{videos.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <Headphones className="h-6 w-6 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Podcasts</p>
              <p className="text-2xl font-bold text-gray-900">{podcasts.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <Mail className="h-6 w-6 text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">New Messages</p>
              <p className="text-2xl font-bold text-gray-900">{messages.filter((m) => !m.is_read).length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <Users className="h-6 w-6 text-green-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{subscribers.filter((s) => s.is_active).length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <BarChart3 className="h-6 w-6 text-green-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Published Articles</p>
              <p className="text-2xl font-bold text-gray-900">{articles.filter((a) => a.status === "published").length}</p>
            </div>
          </div>
        </section>

        {/* tabs */}
        <section className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200 px-6">
            <nav className="flex space-x-8">
              <button onClick={() => setActiveTab("articles")} className={activeTab === "articles" ? "border-orange-500 text-orange-600" : "text-gray-500"}>Articles ({articles.length})</button>
              <button onClick={() => setActiveTab("videos")} className={activeTab === "videos" ? "border-orange-500 text-orange-600" : "text-gray-500"}>Videos ({videos.length})</button>
              <button onClick={() => setActiveTab("podcasts")} className={activeTab === "podcasts" ? "border-orange-500 text-orange-600" : "text-gray-500"}>Podcasts ({podcasts.length})</button>
              <button onClick={() => setActiveTab("messages")} className={activeTab === "messages" ? "border-orange-500 text-orange-600" : "text-gray-500"}>Messages ({messages.filter((m) => !m.is_read).length} new)</button>
              <button onClick={() => setActiveTab("subscribers")} className={activeTab === "subscribers" ? "border-orange-500 text-orange-600" : "text-gray-500"}>Subscribers ({subscribers.length})</button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "articles" && renderTable(articles, "articles", setArticles)}
            {activeTab === "videos" && renderTable(videos, "videos", setVideos)}
            {activeTab === "podcasts" && renderTable(podcasts, "podcasts", setPodcasts)}
            {activeTab === "messages" && (
              <div className="space-y-4">
                {messages.length === 0 && <p className="text-center text-gray-500 py-6">No messages</p>}
                {messages.map((m) => (
                  <div key={m.id} className={`p-6 rounded-lg border ${m.is_read ? "bg-gray-50" : "bg-white"}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{m.name || "Anonymous"}</p>
                        <p className="text-sm text-gray-600">{m.email}</p>
                        <p className="mt-2 text-sm text-gray-800">{m.subject}</p>
                        <p className="mt-2 text-gray-700">{m.message}</p>
                      </div>
                      <div className="text-sm text-gray-500">{formatDate(m.created_at)}</div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      {!m.is_read && <button className="px-3 py-1 rounded bg-green-50 text-green-700 text-sm" onClick={async () => { await updateDoc(doc(db, "contact_messages", m.id), { is_read: true }); setMessages((prev) => prev.map(msg => msg.id === m.id ? { ...msg, is_read: true } : msg)); toast.success("Marked read"); }}>Mark as read</button>}
                      <button className="px-3 py-1 rounded bg-red-50 text-red-700 text-sm" onClick={() => { handleDeleteContent("contact_messages", m.id, setMessages); }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "subscribers" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((s) => (
                      <tr key={s.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{s.email}</td>
                        <td className="px-6 py-4"><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${s.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{s.is_active ? "Active" : "Inactive"}</span></td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(s.created_at)}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDeleteContent("newsletter_subscribers", s.id, setSubscribers)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
