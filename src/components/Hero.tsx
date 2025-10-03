// src/components/Hero.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Article } from "../Hooks/usefirestoredata";
import { useTranslation } from "react-i18next";
import { useHeroSettings } from "../Hooks/useHeroSettings";

interface HeroProps {
  featuredArticle: Article | null;
  breakingHeadlines: Article[];
}

const Hero = ({ featuredArticle, breakingHeadlines }: HeroProps) => {
  const { t } = useTranslation();
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const { sidebarImageUrl } = useHeroSettings();

  useEffect(() => {
    if (!breakingHeadlines.length) return;
    const interval = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % breakingHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [breakingHeadlines]);

  if (!featuredArticle) return null;

  return (
    <section className="relative w-full">
      {/* 🔴 Breaking News Top Strip */}
      {breakingHeadlines.length > 0 && (
        <div className="bg-red-600 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            <span className="font-semibold">{t("hero.breaking")}</span>
            <div className="flex-1 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTickerIndex * 100}%)` }}
              >
                {breakingHeadlines.map((item) => (
                  <Link
                    key={item.id}
                    to={`/article/${item.slug}`}
                    className="block min-w-full hover:underline truncate text-sm sm:text-base"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
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
      <div className="relative w-full overflow-hidden bg-white">
        {/* Background faded image (optional) */}
        <img
          src={featuredArticle.featured_image_url}
          alt={featuredArticle.title}
          className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col lg:flex-row gap-8 items-center">
          {/* Left: Text Content */}
          <div className="lg:flex-1 flex flex-col justify-center space-y-4 text-gray-900">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
              {featuredArticle.title}
            </h1>

            <p className="text-base lg:text-lg text-gray-700 max-w-3xl leading-relaxed">
              {featuredArticle.excerpt}
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span>
                {t("hero.by")} {featuredArticle.author}
              </span>
              <span>•</span>
              <span>
                {featuredArticle.readCount || 0} {t("hero.reads")}
              </span>
            </div>

            <Button asChild size="lg" className="mt-4">
              <Link to={`/article/${featuredArticle.slug}`}>
                {t("hero.readFullStory")}
              </Link>
            </Button>
          </div>

          {/* Right: Featured Image */}
          <div className="lg:flex-1 hidden lg:flex items-center justify-center">
            <img
              src={featuredArticle.featured_image_url}
              alt={featuredArticle.title}
              className="w-full h-full object-cover rounded-lg shadow-md"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
