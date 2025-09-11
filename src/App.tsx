import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { analytics } from "./data/firebase";

import HomePage from "./pages/Home";
import CategoryPage from "./pages/Category.tsx";
import ArticlePage from "./pages/Article.tsx";
import AboutPage from "./pages/About.tsx";
import ContactPage from "./pages/contact.tsx";
import PrivacyPage from "./pages/Privacy.tsx";
import EditorialPage from "./pages/Editorial.tsx";
import AdminLogin from "./pages/Admin/Login.tsx";
import AdminDashboard from "./pages/Admin/Dashboard.tsx";
import NewArticle from "./pages/Admin/New article.tsx";   // ✅ use new one
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import NewsletterBanner from "./components/Newsletter.tsx";

export default function App() {
  useEffect(() => {
    console.log("Firebase initialized ✅", analytics);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/editorial" element={<EditorialPage />} />

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
                  <NewArticle />   {/* ✅ swapped */}
                </ProtectedRoute>
              }
            />
            {/* keep edit if you implement later */}
            <Route
              path="/admin/articles/edit/:id"
              element={
                <ProtectedRoute requireAdmin>
                  <NewArticle />   {/* reuse form for editing later */}
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <NewsletterBanner />
      </div>
    </Router>
  );
}
