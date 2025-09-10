interface Article {
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  timeAgo: string;
}

interface SectionProps {
  title: string;
  articles: Article[];
  showViewAll?: boolean;
}

const Section = ({ title, articles, showViewAll = true }: SectionProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
          {showViewAll && (
            <a
              href="#"
              className="text-green-600 hover:text-green-700 font-medium text-base flex items-center"
            >
              View All
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-3 line-clamp-2 leading-tight hover:text-green-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-base mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.readTime}</span>
                  <span>{article.timeAgo}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;