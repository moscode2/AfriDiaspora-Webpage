// src/pages/NewHomePage.tsx
import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import NewsletterBanner from "../components/Newsletter";
import TrendingSidebar from "../components/trending-sidebar"; // default import
import { MultimediaCarousel } from "../components/multimedia-carousel";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useFirestoreData } from "../Hooks/usefirestoredata";

export default function NewHomePage() {
  const { loading, featuredArticles, trendingArticles, breakingNews, multimedia } =
    useFirestoreData();

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  const featuredStories = featuredArticles;
  const trendingArticlesList = trendingArticles;
  const breakingNewsList = breakingNews;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero with featured article and breaking news */}
      <Hero
        featuredArticle={featuredStories[0] || null}
        breakingHeadlines={breakingNewsList}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Featured Articles Grid */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-8 border-b border-border pb-4">
                Featured Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredStories.map((story) => (
                  <Card key={story.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={story.featured_image_url}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{story.category_id}</Badge>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{story.readCount || 0} reads</span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-3 leading-tight group-hover:text-accent transition-colors">
                        <Link to={`/article/${story.slug}`}>{story.title}</Link>
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {story.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          <span>{story.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(story.published_at || "").toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Multimedia Section */}
            <MultimediaCarousel items={multimedia} title="Videos & Podcasts" />
          </div>

          {/* Trending Sidebar */}
          <div className="hidden lg:block">
            <TrendingSidebar trendingArticles={trendingArticlesList} />
          </div>
        </div>
      </main>

      <NewsletterBanner />
      <Footer />
    </div>
  );
}
