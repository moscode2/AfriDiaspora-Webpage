import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "./Ui/badge";
import { Button } from "./Ui/button";
import { Card, CardContent } from "./Ui/card";

const Hero = () => {
  const featuredStory = {
    id: "2",
    slug: "african-cultural-heritage-2025",
    title: "Celebrating African Culture: Tradition Meets Modern Expression",
    excerpt:
      "From vibrant festivals to innovative art forms, Africa’s cultural heritage continues to inspire the world while evolving with modern influences.",
    image:
      "https://images.pexels.com/photos/3166806/pexels-photo-3166806.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Culture & Heritage",
    readTime: "6 min read",
    author: "Kwame Ndlovu",
    publishedAt: "2025-02-20",
  };

  const breakingHeadlines = [
    { id: "2", title: "African Entrepreneurs Thrive in Berlin's Tech Scene", slug: "berlin-african-tech-entrepreneurs" },
    { id: "3", title: "Afrobeats Reshaping European Culture in 2025", slug: "afrobeats-european-culture-2025" },
    { id: "4", title: "Budget Travel Tips: Exploring Europe on €50 a Day", slug: "budget-travel-europe-50-euros" },
    { id: "5", title: "France Announces New Visa Pathways for Skilled Workers", slug: "france-new-visa-pathways-skilled-workers" },
  ];

  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % breakingHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black/50 to-black/30 min-h-[500px] lg:min-h-[600px]">
        <img
          src={featuredStory.image}
          alt={featuredStory.title}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-3 gap-8 h-full items-end pb-12">
            {/* Main Story - Left 2/3 */}
            <div className="lg:col-span-2 text-white space-y-6">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                {featuredStory.category}
              </Badge>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                {featuredStory.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-100 max-w-3xl leading-relaxed">
                {featuredStory.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>By {featuredStory.author}</span>
                <span>•</span>
                <span>{featuredStory.readTime}</span>
              </div>
              
              <Button asChild size="lg" className="mt-6">
                <Link to={`/article/${featuredStory.slug}`}>
                  Read Full Story
                </Link>
              </Button>
            </div>

            {/* Breaking News Ticker - Right 1/3 (Desktop Only) */}
            <div className="hidden lg:block">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-accent mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Breaking News
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
            Breaking News
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
