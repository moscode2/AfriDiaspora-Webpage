import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { useEffect } from "react";
import { analytics } from "./data/firebase";

// Pages
import NewHome from "./pages/NewHome.tsx";
import CategoryPage from "./pages/Category.tsx";
import ArticlePage from "./pages/Article.tsx";
import AboutPage from "./pages/About.tsx";
import ContactPage from "./pages/contact.tsx";
import PrivacyPage from "./pages/Privacy.tsx";
import EditorialPage from "./pages/Editorial.tsx";
import AdminLogin from "./pages/Admin/Login.tsx";
import AdminDashboard from "./pages/Admin/Dashboard.tsx";
import NewArticle from "./pages/Admin/New article.tsx";
import HeroSettings from "./pages/Admin/HeroSettings.tsx";
import VideoForm from "./pages/Admin/videos/videoForm.tsx";
import PodcastForm from "./pages/Admin/podcast/podcastForm.tsx";
import VideosPage from "./pages/VideosPage.tsx";
import PodcastPage from "./pages/PodcastPage.tsx";


// Components
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
            {/* Public Routes */}
            <Route path="/" element={<NewHome />} />
            <Route path="/category/:slug" element={<CategoryPageWrapper />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/editorial" element={<EditorialPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/podcasts" element={<PodcastPage />} />



            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* Articles */}
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
                  <NewArticle />
                </ProtectedRoute>
              }
            />
            {/* Videos */}
            <Route
              path="/admin/videos/new"
              element={
                <ProtectedRoute requireAdmin>
                  <VideoForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/videos/edit/:id"
              element={
                <ProtectedRoute requireAdmin>
                  <VideoForm />
                </ProtectedRoute>
              }
            />
            {/* Podcasts */}
            <Route
              path="/admin/podcasts/new"
              element={
                <ProtectedRoute requireAdmin>
                  <PodcastForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/podcasts/edit/:id"
              element={
                <ProtectedRoute requireAdmin>
                  <PodcastForm />
                </ProtectedRoute>
              }
            />
            {/* Hero Settings */}
            <Route
              path="/admin/hero-settings"
              element={
                <ProtectedRoute requireAdmin>
                  <HeroSettings />
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
