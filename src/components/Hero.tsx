import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Ticker.module.css"; // import CSS module

const Hero = () => {
  const featuredStory = {
    id: "1",
    title:
      "Germany Expands Chancenkarte Program: What It Means for African Migrants in 2025",
    excerpt:
      "New opportunities emerge as Germany's points-based immigration system opens doors for skilled workers from Africa. Here's everything you need to know about the expanded program.",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Policy & Migration",
    readTime: "5 min read",
  };

  const breakingHeadlines = [
    { id: "2", title: "African Entrepreneurs Thrive in Berlin's Tech Scene" },
    { id: "3", title: "Afrobeats Reshaping European Culture in 2025" },
    { id: "4", title: "Budget Travel Tips: Exploring Europe on €50 a Day" },
    { id: "5", title: "France Announces New Visa Pathways for Skilled Workers" },
  ];

  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % breakingHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [breakingHeadlines.length]);

  return (
    <section className="relative">
      <div className="relative h-[420px] md:h-[520px] overflow-hidden">
        {/* Background Image + Gradient */}
        <img
          src={featuredStory.image}
          alt={featuredStory.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Overlay content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between">
          {/* Left: Featured Story */}
          <div className="w-full lg:w-2/3 text-white mb-6 lg:mb-0">
            <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              {featuredStory.category}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
              {featuredStory.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-orange-100 drop-shadow-md">
              {featuredStory.excerpt}
            </p>
            <div className="mt-6">
              <Link
                to={`/article/${featuredStory.id}`}
                className="inline-block px-6 py-3 border-2 border-white rounded-md text-white font-semibold hover:bg-white hover:text-orange-600 transition transform hover:scale-105"
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Right: Breaking News Ticker (desktop only) */}
          <div className="hidden lg:block w-1/3 pl-8">
            <div className="bg-white/95 text-gray-900 p-4 rounded-lg shadow">
              <div className="text-sm font-semibold mb-2 text-orange-600">
                Breaking
              </div>
              <div className="h-32 overflow-hidden relative">
                <ul
                  className={`${styles.tickerList} ${styles[`t${tickerIndex}`]}`}
                >
                  {breakingHeadlines.map((item) => (
                    <li key={item.id} className="h-32 flex items-center">
                      <Link
                        to={`/article/${item.id}`}
                        className="font-medium hover:underline"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-xs text-gray-500 mt-2">Latest headlines</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile ticker below main story */}
      <div className="lg:hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
          <div className="text-sm font-semibold text-orange-600">Breaking</div>
          {breakingHeadlines.map((item) => (
            <Link
              key={item.id}
              to={`/article/${item.id}`}
              className="block font-medium border-b border-gray-200 py-2 hover:text-orange-500 transition"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
