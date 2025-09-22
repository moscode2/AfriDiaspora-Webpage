import { Link } from "react-router-dom";
import { Clock, User, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import NewsletterBanner from "../components/Newsletter";
import { TrendingSidebar } from "../components/trending-sidebar";
import { MultimediaCarousel } from "../components/multimedia-carousel";
import { BreakingNewsTicker } from "../components/breaking-news-ticker";
import { Card, CardContent } from "../components/Ui/card";
import { Badge } from "../components/Ui/badge";
import { Button } from "../components/Ui/button";

// Mock data - replace with actual data fetching
const featuredStories = [
  {
    id: "1",
    title: "African Tech Entrepreneurs Leading Innovation in Amsterdam",
    excerpt: "Meet the visionaries transforming Europe's startup landscape with groundbreaking solutions and unwavering determination.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Business",
    slug: "african-tech-entrepreneurs-amsterdam",
    author: "Kwame Asante",
    publishedAt: "2025-01-15",
    readTime: "7 min read"
  },
  {
    id: "2",
    title: "The Rise of Afro-European Fusion Cuisine",
    excerpt: "How African chefs across Europe are revolutionizing traditional dishes and creating entirely new culinary experiences.",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Culture",
    slug: "afro-european-fusion-cuisine",
    author: "Zara Okonkwo",
    publishedAt: "2025-01-14",
    readTime: "5 min read"
  },
  {
    id: "3",
    title: "New EU Migration Policies Impact African Communities",
    excerpt: "Comprehensive analysis of recent policy changes and their effects on African diaspora communities across European nations.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Politics",
    slug: "eu-migration-policies-african-communities",
    author: "Samuel Adjei",
    publishedAt: "2025-01-13",
    readTime: "6 min read"
  }
];

const categoryNews = {
  "africa": [
    {
      id: "4",
      title: "Ghana's Digital Economy Attracts European Investment",
      excerpt: "Major European tech giants are establishing partnerships with Ghanaian startups.",
      category: "Africa",
      slug: "ghana-digital-economy-european-investment",
      publishedAt: "2025-01-12",
      readTime: "4 min read"
    },
    {
      id: "5", 
      title: "Nigeria's Renewable Energy Sector Shows Promise",
      excerpt: "Solar and wind projects gain momentum with international backing.",
      category: "Africa",
      slug: "nigeria-renewable-energy-sector",
      publishedAt: "2025-01-11",
      readTime: "5 min read"
    }
  ],
  "europe": [
    {
      id: "6",
      title: "Berlin's African Cultural Center Opens New Wing",
      excerpt: "Expanded space will host more exhibitions and community events.",
      category: "Europe",
      slug: "berlin-african-cultural-center-new-wing",
      publishedAt: "2025-01-12",
      readTime: "3 min read"
    },
    {
      id: "7",
      title: "French Universities Launch African Studies Programs",
      excerpt: "New curricula focus on contemporary African politics and economics.",
      category: "Europe", 
      slug: "french-universities-african-studies",
      publishedAt: "2025-01-10",
      readTime: "4 min read"
    }
  ],
  "diaspora-voices": [
    {
      id: "8",
      title: "Building Bridges: African Women in European Leadership",
      excerpt: "Celebrating the achievements of African women breaking barriers in corporate Europe.",
      category: "Diaspora Voices",
      slug: "african-women-european-leadership",
      publishedAt: "2025-01-11",
      readTime: "6 min read"
    }
  ]
};

const trendingArticles = [
  {
    id: "9",
    title: "The Economic Impact of African Diaspora Remittances to Europe",
    slug: "african-diaspora-remittances-europe",
    readCount: 15420
  },
  {
    id: "10", 
    title: "African Fashion Week Takes Over Milan",
    slug: "african-fashion-week-milan",
    readCount: 12350
  }
];

const multimediaItems = [
  {
    id: "1",
    title: "Inside Amsterdam's African Quarter",
    type: "video" as const,
    thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    duration: "12:34",
    description: "A documentary exploring the vibrant African community in Amsterdam.",
    url: "/video/amsterdam-african-quarter"
  },
  {
    id: "2",
    title: "Diaspora Stories Podcast",
    type: "podcast" as const,
    thumbnail: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    duration: "45:12",
    description: "Weekly conversations with African diaspora leaders.",
    url: "/podcast/diaspora-stories"
  }
];

const breakingNews = [
  {
    id: "11",
    title: "EU Announces New Scholarship Program for African Students",
    slug: "eu-scholarship-program-african-students"
  },
  {
    id: "12",
    title: "African Union Opens New Office in Brussels", 
    slug: "african-union-office-brussels"
  }
];

export default function NewHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreakingNewsTicker articles={breakingNews} />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Featured Stories */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-8 border-b border-border pb-4">Featured Stories</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredStories.map((story) => (
                  <Card key={story.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{story.category}</Badge>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{story.readTime}</span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-3 leading-tight group-hover:text-accent transition-colors">
                        <Link to={`/article/${story.slug}`}>
                          {story.title}
                        </Link>
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
                          <span>{new Date(story.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Category Sections */}
            {Object.entries(categoryNews).map(([categoryKey, articles]) => (
              <section key={categoryKey}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-3xl font-bold border-b border-border pb-4">
                    {categoryKey === "africa" && "Africa News"}
                    {categoryKey === "europe" && "Europe News"}
                    {categoryKey === "diaspora-voices" && "Diaspora Voices"}
                  </h2>
                  <Button variant="ghost" asChild>
                    <Link to={`/category/${categoryKey}`} className="gap-2">
                      View All <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {articles.map((article) => (
                    <Card key={article.id} className="group hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{article.readTime}</span>
                        </div>
                        <h3 className="font-serif text-xl font-semibold mb-3 leading-tight group-hover:text-accent transition-colors">
                          <Link to={`/article/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}

            {/* Multimedia Section */}
            <MultimediaCarousel items={multimediaItems} title="Videos & Podcasts" />
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block">
            <TrendingSidebar trendingArticles={trendingArticles} />
          </div>
        </div>
      </main>

      <NewsletterBanner />
    <Footer/>
    </div>
  );
}