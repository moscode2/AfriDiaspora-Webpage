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
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../../data/firebase"; // <-- your firebase exports
import toast, { Toaster } from "react-hot-toast";
import { DocumentData } from "firebase/firestore";

/**
 * Local Firestore-friendly types (use string id because Firestore doc id is a string).
 * These intentionally avoid coupling to any app-wide 'Article' type that expects numeric id.
 */
type ArticleDoc = {
    id: string;
    title?: string;
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
    [k: string]: unknown; // Changed from any to unknown
};

type SubscriberDoc = {
  id: string;
  email?: string;
  is_active?: boolean;
  created_at?: Timestamp | string | null;
  [k: string]: unknown;
};

// Helper: convert QuerySnapshot -> typed array
function mapSnapshotToDocs<T extends { id: string }>(
    snap: QuerySnapshot<DocumentData>
): T[] {
    return snap.docs.map((d): T => {
        const data = d.data();
        const rest = data as Omit<T, 'id'>; // Omit 'id' from the type
        return { id: d.id, ...rest } as T; // Cast to T
    });
}

// Helper: format Firestore timestamp or string
function formatDate(value: unknown): string {
    if (!value) return "—";
    // Firestore Timestamp has toDate()
    if (value instanceof Timestamp) {
        return value.toDate().toLocaleString();
    }
    if (typeof value === "string" || value instanceof String) {
        const dt = new Date(String(value));
        return isNaN(dt.getTime()) ? String(value) : dt.toLocaleString();
    }
    if (value instanceof Date) return value.toLocaleString();
    return String(value);
}

export default function AdminDashboard(): JSX.Element {
  const [articles, setArticles] = useState<ArticleDoc[]>([]);
  const [messages, setMessages] = useState<ContactMessageDoc[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">(
    "all"
  );
  const [activeTab, setActiveTab] = useState<
    "articles" | "messages" | "subscribers"
  >("articles");

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      // Articles
      const articlesSnap = await getDocs(
        query(collection(db, "articles"), orderBy("created_at", "desc"))
      );
      setArticles(mapSnapshotToDocs<ArticleDoc>(articlesSnap));

      // Messages
      const messagesSnap = await getDocs(
        query(collection(db, "contact_messages"), orderBy("created_at", "desc"))
      );
      setMessages(mapSnapshotToDocs<ContactMessageDoc>(messagesSnap));

      // Subscribers
      const subsSnap = await getDocs(
        query(
          collection(db, "newsletter_subscribers"),
          orderBy("created_at", "desc")
        )
      );
      setSubscribers(mapSnapshotToDocs<SubscriberDoc>(subsSnap));
    } catch (err) {
      console.error("fetchAll error:", err);
      toast.error("Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  }

  // Auth
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out");
    } catch (err) {
      console.error("signOut error:", err);
      toast.error("Failed to sign out");
    }
  };

  // Article actions
  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    try {
      await deleteDoc(doc(db, "articles", id));
      setArticles((prev) => prev.filter((a) => a.id !== id));
      toast.success("Article deleted");
    } catch (err) {
      console.error("deleteArticle error:", err);
      toast.error("Failed to delete article");
    }
  };

  const handleToggleStatus = async (id: string, current: string | undefined) => {
    const newStatus = current === "published" ? "draft" : "published";
    try {
      await updateDoc(doc(db, "articles", id), { status: newStatus });
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      toast.success(`Article marked ${newStatus}`);
    } catch (err) {
      console.error("toggleStatus error:", err);
      toast.error("Failed to update status");
    }
  };

  // Message actions
  const markMessageAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, "contact_messages", id), { is_read: true });
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
      toast.success("Message marked read");
    } catch (err) {
      console.error("markMessageAsRead error:", err);
      toast.error("Failed to update message");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db, "contact_messages", id));
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success("Message deleted");
    } catch (err) {
      console.error("deleteMessage error:", err);
      toast.error("Failed to delete message");
    }
  };

  // Subscriber actions
  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Remove subscriber?")) return;
    try {
      await deleteDoc(doc(db, "newsletter_subscribers", id));
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      toast.success("Subscriber removed");
    } catch (err) {
      console.error("deleteSubscriber error:", err);
      toast.error("Failed to remove subscriber");
    }
  };

  // Filters & search
  const filteredArticles = articles.filter((a) => {
    const title = (a.title || "").toLowerCase();
    const matchesSearch = title.includes(searchTerm.trim().toLowerCase());
    const matchesFilter = filterStatus === "all" || a.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusClasses = (status?: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">AEN</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900"> Admin Section</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                aria-label="View site"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <Eye className="h-5 w-5 mr-2" />
                <span>View site</span>
              </Link>

              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter((m) => !m.is_read).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscribers.filter((s) => s.is_active).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter((a) => a.status === "published").length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* tabs */}
        <section className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200 px-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("articles")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "articles"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-pressed={activeTab === "articles"}
              >
                Articles ({articles.length})
              </button>

            <button
                onClick={() => setActiveTab("messages")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "messages"
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-pressed={activeTab === "messages" ? "true" : "false"}
            >
                Messages ({messages.filter((m) => !m.is_read).length} new)
            </button>

            <button
                onClick={() => setActiveTab("subscribers")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "subscribers"
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-pressed={activeTab === "subscribers" ? "true" : "false"}
            >
                Subscribers ({subscribers.length})
            </button>
            </nav>
          </div>

          <div className="p-6">
            {/* ARTICLES */}
            {activeTab === "articles" && (
              <>
                <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <label htmlFor="searchArticles" className="sr-only">
                      Search articles
                    </label>
                    <input
                      id="searchArticles"
                      type="text"
                      aria-label="Search articles"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label htmlFor="statusFilter" className="sr-only">
                      Filter by status
                    </label>
                    <Filter className="h-5 w-5 text-gray-400" aria-hidden />
                    <select
                      id="statusFilter"
                      aria-label="Filter articles by status"
                      value={filterStatus}
                      onChange={(e) =>
                        setFilterStatus(e.target.value as "all" | "published" | "draft")
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>

                    <Link
                      to="/admin/articles/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                      aria-label="Create new article"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Article
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredArticles.map((article) => (
                        <tr key={article.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {article.title || "Untitled"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
                                article.status
                              )}`}
                            >
                              {article.status || "n/a"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(article.created_at)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Link
                                to={`/admin/articles/edit/${article.id}`}
                                className="text-orange-600 hover:text-orange-900 inline-flex items-center"
                                aria-label={`Edit ${article.title || "article"}`}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                <span className="sr-only">Edit</span>
                              </Link>

                              <button
                                onClick={() =>
                                  handleToggleStatus(article.id, article.status)
                                }
                                className="text-blue-600 hover:text-blue-900"
                                aria-label={`Toggle status for ${article.title || "article"}`}
                              >
                                Toggle
                              </button>

                              <button
                                onClick={() => handleDeleteArticle(article.id)}
                                className="text-red-600 hover:text-red-900 inline-flex items-center"
                                aria-label={`Delete ${article.title || "article"}`}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                <span className="sr-only">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredArticles.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-6 text-center text-gray-500">
                            No articles found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* MESSAGES */}
            {activeTab === "messages" && (
              <div className="space-y-4">
                {messages.length === 0 && (
                  <p className="text-center text-gray-500 py-6">No messages</p>
                )}

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-6 rounded-lg border ${
                      m.is_read ? "bg-gray-50" : "bg-white"
                    }`}
                  >
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
                      {!m.is_read && (
                        <button
                          onClick={() => markMessageAsRead(m.id)}
                          className="px-3 py-1 rounded bg-green-50 text-green-700 text-sm"
                          aria-label={`Mark message from ${m.name} as read`}
                        >
                          Mark as read
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="px-3 py-1 rounded bg-red-50 text-red-700 text-sm"
                        aria-label={`Delete message from ${m.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUBSCRIBERS */}
            {activeTab === "subscribers" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscribed
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((s) => (
                      <tr key={s.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{s.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              s.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {s.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(s.created_at)}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(s.id)}
                            className="text-red-600 hover:text-red-900"
                            aria-label={`Remove subscriber ${s.email}`}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))}

                    {subscribers.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-6 text-gray-500">
                          No subscribers
                        </td>
                      </tr>
                    )}
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
