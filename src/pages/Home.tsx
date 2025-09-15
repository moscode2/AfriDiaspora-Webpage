// src/pages/Home.tsx
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsletterBanner from "../components/Newsletter";
import ArticleCard from "../components/ArticleCard";
import { useStaticData } from "../Hooks/useStaticData";

export default function HomePage() {
  const { articles, loading, getFeaturedArticles } = useStaticData();
  const featuredArticles = getFeaturedArticles().slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://mocha-cdn.com/0198dbb7-3dc2-734a-94c7-68f472e12814/hero-background.jpg"
            alt="Hero background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Uniting Africans across Europe
          </h1>
          <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
            Stay connected with AfriEuropa news, opportunities, and stories that
            matter to our community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/category/news"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              Latest News
            </Link>
            <Link
              to="/category/business-jobs"
              className="inline-flex items-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
            >
              Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Stories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest news, insights, and opportunities shaping the
            African diaspora experience in Europe
          </p>
        </div>

        {featuredArticles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ArticleCard article={featuredArticles[0]} featured={true} />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 border-b-2 border-orange-600 pb-2">
                Latest Stories
              </h2>
              {featuredArticles.slice(1).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No articles available yet.
          </p>
        )}
      </section>

      <NewsletterBanner />
      <Footer />
    </div>
  );
}
