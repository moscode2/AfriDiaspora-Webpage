import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Article } from "../Hooks/usefirestoredata";
import { useTranslation } from "react-i18next";

interface HeroProps {
  featuredArticle: Article | null;
  breakingHeadlines: Article[];
}

const Hero = ({ featuredArticle, breakingHeadlines }: HeroProps) => {
  const { t } = useTranslation();
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);

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
        <img
          src={featuredArticle.featured_image_url}
          alt={featuredArticle.title}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-3 gap-8 h-full items-end pb-12">
            {/* Main Story */}
            <div className="lg:col-span-2 text-white space-y-6">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                {featuredArticle.category_id}
              </Badge>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                {featuredArticle.title}
              </h1>

              <p className="text-lg lg:text-xl text-gray-100 max-w-3xl leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>{t("hero.by")} {featuredArticle.author}</span>
                <span>•</span>
                <span>{featuredArticle.readCount || 0} {t("hero.reads")}</span>
              </div>

              <Button asChild size="lg" className="mt-6">
                <Link to={`/article/${featuredArticle.slug}`}>{t("hero.readFullStory")}</Link>
              </Button>
            </div>

            {/* Breaking News Sidebar (Desktop) */}
            <div className="hidden lg:block">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-accent mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    {t("hero.breakingNews")}
                  </h3>

                  <div className="space-y-3">
                    {breakingHeadlines.map((item, index) => (
                      <div
                        key={item.id}
                        className={`transition-opacity duration-500 ${
                          index === currentTickerIndex ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        <Link
                          to={`/article/${item.slug}`}
                          className="block font-medium text-sm leading-tight hover:text-accent transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-1 mt-4">
                    {breakingHeadlines.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTickerIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTickerIndex ? "bg-accent" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Breaking News */}
      <div className="lg:hidden bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h3 className="font-semibold text-accent mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            {t("hero.breakingNews")}
          </h3>
          <div className="space-y-3">
            {breakingHeadlines.map((item) => (
              <Link
                key={item.id}
                to={`/article/${item.slug}`}
                className="block font-medium text-sm border-b border-border pb-3 hover:text-accent transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;