import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Article } from "../Hooks/usefirestoredata";
import { useTranslation } from "react-i18next";
import { useHeroSettings } from "../Hooks/useHeroSettings"; // 👈 import hook

interface HeroProps {
  featuredArticle: Article | null;
  breakingHeadlines: Article[];
}

const Hero = ({ featuredArticle, breakingHeadlines }: HeroProps) => {
  const { t } = useTranslation();
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const { sidebarImageUrl } = useHeroSettings(); // 👈 fetch sidebar image from hook

  useEffect(() => {
    if (!breakingHeadlines.length) return;
    const interval = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % breakingHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [breakingHeadlines]);

  if (!featuredArticle) return null;

  return (
    <section className="relative">
      {/* 🔴 Breaking News Top Strip */}
      {breakingHeadlines.length > 0 && (
        <div className="bg-red-600 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            <span className="font-semibold">{t("hero.breaking")}</span>

            {/* Rotating ticker */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTickerIndex * 100}%)` }}
              >
                {breakingHeadlines.map((item) => (
                  <Link
                    key={item.id}
                    to={`/article/${item.slug}`}
                    className="block min-w-full hover:underline truncate"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dots navigation */}
            <div className="flex gap-1">
              {breakingHeadlines.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTickerIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTickerIndex ? "bg-white" : "bg-red-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black/50 to-black/30 min-h-[500px] lg:min-h-[600px]">
        {/* Background image */}
        <img
          src={featuredArticle.featured_image_url}
          alt={featuredArticle.title}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-3 gap-8 h-full items-stretch pb-12">
            {/* Main Story */}
            <div className="lg:col-span-2 text-white space-y-6 self-center">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                {featuredArticle.title}
              </h1>

              <p className="text-lg lg:text-xl text-gray-100 max-w-3xl leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>
                  {t("hero.by")} {featuredArticle.author}
                </span>
                <span>•</span>
                <span>
                  {featuredArticle.readCount || 0} {t("hero.reads")}
                </span>
              </div>

              <Button asChild size="lg" className="mt-6">
                <Link to={`/article/${featuredArticle.slug}`}>
                  {t("hero.readFullStory")}
                </Link>
              </Button>
            </div>

            {/* Sidebar Image */}
            {sidebarImageUrl && (
              <div className="hidden lg:block h-full">
                <img
                  src={sidebarImageUrl}
                  alt="Sidebar Promo"
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
