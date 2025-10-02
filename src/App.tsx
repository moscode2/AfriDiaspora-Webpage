import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { useEffect } from "react";
import { analytics } from "./data/firebase";
import NewHome from "./pages/NewHome.tsx";
import CategoryPage from "./pages/Category.tsx";
import ArticlePage from "./pages/Article.tsx";
import AboutPage from "./pages/About.tsx";
import ContactPage from "./pages/contact.tsx";
import PrivacyPage from "./pages/Privacy.tsx";
import EditorialPage from "./pages/Editorial.tsx";
import AdminLogin from "./pages/Admin/Login.tsx";
import AdminDashboard from "./pages/Admin/Dashboard.tsx";
import NewArticle from "./pages/Admin/New article.tsx"; // ✅
import HeroSettings from "./pages/Admin/HeroSettings.tsx"; // ✅ new page
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NewsletterBanner from "./components/Newsletter.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import Support from "./pages/support.tsx";

// ✅ Wrapper ensures CategoryPage remounts on slug change
function CategoryPageWrapper() {
  const { slug } = useParams();
  return <CategoryPage key={slug} />;
}

export default function App() {
  useEffect(() => {
    console.log("Firebase initialized ✅", analytics);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<NewHome />} />

            {/* ✅ use wrapper instead of CategoryPage directly */}
            <Route path="/category/:slug" element={<CategoryPageWrapper />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/editorial" element={<EditorialPage />} />
            <Route path="/support" element={<Support />} />

            {/* 🔑 Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles/new"
              element={
                <ProtectedRoute requireAdmin>
                  <NewArticle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles/edit/:id"
              element={
                <ProtectedRoute requireAdmin>
                  <NewArticle /> {/* reuse form for editing */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hero-settings"
              element={
                <ProtectedRoute requireAdmin>
                  <HeroSettings /> {/* ✅ new hero settings route */}
                </ProtectedRoute>
              }
            />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    404 - Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        </main>

        <NewsletterBanner />
      </div>
    </Router>
  );
}
