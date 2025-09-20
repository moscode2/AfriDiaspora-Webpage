// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { useStaticData } from "../Hooks/useStaticData";
import ArticleCard from "../components/ArticleCard";
import NewsletterBanner from "../components/Newsletter";
import Footer from "../components/Footer";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// ✅ Translations
const translations = {
  en: {
    brand: "AfriEuropa News",
    footerText: "Bridge Between Continents",
    welcome: "Uniting Africans Across Europe",
    newsletterTitle: "Stay connected with the African diaspora in Europe",
    latest: "Latest News",
    support: "Featured News",
    noArticles: "No articles available yet.",

    africaNews: "Africa News",
    europeNews: "Europe News",
    diasporaVoices: "Diaspora Voices",
    opinion: "Opinion",
    businessEconomy: "Business & Economy",
    cultureTravel: "Culture & Travel",
  },
  nl: {
    brand: "AfriEuropa Nieuws",
    footerText: "Brug tussen continenten",
    welcome: "Afrikanen in heel Europa verenigen",
    newsletterTitle: "Blijf verbonden met de Afrikaanse diaspora in Europa",
    latest: "Laatste Nieuws",
    support: "Uitgelicht Nieuws",
    noArticles: "Nog geen artikelen beschikbaar.",

    africaNews: "Afrika Nieuws",
    europeNews: "Europa Nieuws",
    diasporaVoices: "Diaspora Stemmen",
    opinion: "Opinie ",
    businessEconomy: "Bedrijven & Economie",
    cultureTravel: "Cultuur & Reizen",
  },
  fr: {
    brand: "AfriEuropa Nouvelles",
    footerText: "Pont entre les continents",
    welcome: "Unir les Africains à travers l’Europe",
    newsletterTitle: "Restez connectés avec la diaspora africaine en Europe",
    latest: "Dernières Nouvelles",
    support: "Actualités en Vedette",
    noArticles: "Aucun article disponible pour le moment.",

    africaNews: "Actualités Afrique",
    europeNews: "Actualités Europe",
    diasporaVoices: "Voix de la Diaspora",
    opinion: "Opinion ",
    businessEconomy: "Affaires & Économie",
    cultureTravel: "Culture & Voyage",
  },
  es: {
    brand: "AfriEuropa Noticias",
    footerText: "Puente entre continentes",
    welcome: "Uniendo a los africanos en toda Europa",
    newsletterTitle: "Mantente conectado con la diáspora africana en Europa",
    latest: "Últimas Noticias",
    support: "Noticias Destacadas",
    noArticles: "No hay artículos disponibles todavía.",

    africaNews: "Noticias África",
    europeNews: "Noticias Europa",
    diasporaVoices: "Voces de la Diáspora",
    opinion: "Opinión",
    businessEconomy: "Negocios & Economía",
    cultureTravel: "Cultura & Viajes",
  },
};

// ✅ Header Component
function Header({
  onLanguageChange,
  language,
}: {
  onLanguageChange: (lang: "en" | "nl" | "fr" | "es") => void;
  language: "en" | "nl" | "fr" | "es";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[language];

  // 🔑 Use Firestore-friendly slugs
  const navItems = [
    { path: "/category/africa-news", label: t.africaNews },
    { path: "/category/europe-news", label: t.europeNews },
    { path: "/category/diaspora-voices", label: t.diasporaVoices },
    { path: "/category/opinion", label: t.opinion },
    { path: "/category/business-economy", label: t.businessEconomy },
    { path: "/category/culture-travel", label: t.cultureTravel },
  ];

  const languages = [
    { code: "en", label: "English", flag: "gb" },
    { code: "nl", label: "Dutch", flag: "nl" },
    { code: "fr", label: "French", flag: "fr" },
    { code: "es", label: "Spanish", flag: "es" },
  ];

  return (
    <header className="w-full border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex flex-col">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AEN</span>
            </div>
            <span className="text-xl font-bold">{t.brand}</span>
          </Link>
          <span className="text-xs text-gray-500">{t.footerText}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-orange-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language & Hamburger */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() =>
                  onLanguageChange(lang.code as "en" | "nl" | "fr" | "es")
                }
                className="hover:opacity-80 transition"
              >
                <img
                  src={`https://flagcdn.com/w20/${lang.flag}.png`}
                  alt={lang.label}
                  className="w-6 h-4 rounded-sm"
                />
              </button>
            ))}
          </div>
          <button
            className="md:hidden p-2 rounded-md text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-100 border-t">
          <nav className="flex flex-col space-y-2 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex space-x-4 mt-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code as "en" | "nl" | "fr" | "es");
                    setMenuOpen(false);
                  }}
                  className="hover:opacity-80 transition"
                >
                  <img
                    src={`https://flagcdn.com/w20/${lang.flag}.png`}
                    alt={lang.label}
                    className="w-6 h-4 rounded-sm"
                  />
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// ✅ HomePage
export default function HomePage() {
  const { loading, getArticlesByCategory, getFeaturedArticles } = useStaticData();
  const [language, setLanguage] = useState<"en" | "nl" | "fr" | "es">("en");
  const t = translations[language];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // 🔑 Use Firestore slugs
  const categories = [
    { key: "africa-news", title: t.africaNews },
    { key: "europe-news", title: t.europeNews },
    { key: "diaspora-voices", title: t.diasporaVoices },
    { key: "opinion", title: t.opinion },
    { key: "business-economy", title: t.businessEconomy },
    { key: "culture-travel", title: t.cultureTravel },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLanguageChange={setLanguage} language={language} />

      {/* Hero Section */}
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
            {t.welcome}
          </h1>
          <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
            {t.newsletterTitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/category/africa-news"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              {t.latest}
            </Link>
            <Link
              to="/category/business-economy"
              className="inline-flex items-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
            >
              {t.support}
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.support}</h2>
        {getFeaturedArticles().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFeaturedArticles()
              .slice(0, 3)
              .map((article) => (
                <ArticleCard key={article.id} article={article} featured={true} />
              ))}
          </div>
        ) : (
          <p className="text-gray-500">{t.noArticles}</p>
        )}
      </section>

      {/* ✅ Category Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {categories.map((cat) => {
          const articles = getArticlesByCategory(cat.key).slice(0, 3);
          return (
            <div key={cat.key}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {cat.title}
              </h2>
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} featured={false} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">{t.noArticles}</p>
              )}
            </div>
          );
        })}
      </section>

      <NewsletterBanner />
      <Footer />
    </div>
  );
}
