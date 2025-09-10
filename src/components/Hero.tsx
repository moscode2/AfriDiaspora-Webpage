const Hero = () => {
  const featuredStory = {
    title: "Germany Expands Chancenkarte Program: What It Means for African Migrants in 2025",
    excerpt: "New opportunities emerge as Germany's points-based immigration system opens doors for skilled workers from Africa. Here's everything you need to know about the expanded program.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Policy & Migration",
    readTime: "5 min read"
  };

  const highlightStories = [
    {
      title: "African Entrepreneurs Thrive in Berlin's Tech Scene",
      excerpt: "Meet the innovators building bridges between Africa and Europe through technology.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Business & Jobs"
    },
    {
      title: "Celebrating Afrobeats: How African Music is Reshaping European Culture",
      excerpt: "From underground clubs to mainstream festivals, African music continues to influence European cultural landscape.",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Culture & Lifestyle"
    },
    {
      title: "Budget Travel Tips: Exploring Europe on €50 a Day",
      excerpt: "Practical advice for diaspora travelers looking to explore Europe without breaking the bank.",
      image: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Travel & Mobility"
    }
  ];

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Story */}
          <div className="lg:col-span-2">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-base font-medium mb-3">
                  {featuredStory.category}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {featuredStory.title}
                </h2>
                <p className="text-gray-200 mb-4 line-clamp-2 text-lg">
                  {featuredStory.excerpt}
                </p>
                <div className="flex items-center text-base text-gray-300">
                  <span>{featuredStory.readTime}</span>
                  <span className="mx-2">•</span>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlight Stories */}
          <div className="space-y-6">
            {highlightStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium mb-2">
                      {story.category}
                    </span>
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 leading-tight">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {story.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;