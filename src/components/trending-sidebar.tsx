// src/components/TrendingSidebar.tsx
import { Link } from "react-router-dom";
import { TrendingUp, Heart, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useFirestoreData } from "../Hooks/usefirestoredata";

// Custom X (Twitter) Icon
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <path d="M18 2H21L13.5 10.5L21.5 22H15L10 15.5L4.5 22H1.5L9 13L1.5 2H7.5L12.5 8.5L18 2Z" />
  </svg>
);

export default function TrendingSidebar() {
  const { trendingArticles } = useFirestoreData(); // directly get the array

  return (
    <aside className="w-80 space-y-6">
      {/* Trending Articles */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-accent" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingArticles.length > 0 ? (
            trendingArticles.slice(0, 5).map((article, index) => (
              <div key={article.id} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/article/${article.slug}`}
                    className="block text-sm font-medium leading-tight hover:text-accent transition-colors line-clamp-3"
                  >
                    {article.title}
                  </Link>
                  {article.readCount && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {article.readCount.toLocaleString()} reads
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No trending articles yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Support Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-red-500" />
            Support Our Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Help us continue bringing you quality journalism about the African diaspora in Europe.
          </p>
          <Button asChild className="w-full" size="sm">
            <Link to="/support">Support AfriEuropa News</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Follow Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {/* LinkedIn */}
            <Button asChild variant="outline" size="sm" className="justify-start gap-2 w-full">
              <a
                href="https://www.linkedin.com/company/afrieuropa-news/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>
            <Separator className="my-2" />

            {/* Facebook */}
            <Button asChild variant="outline" size="sm" className="justify-start gap-2 w-full">
              <a
                href="https://www.facebook.com/profile.php?id=61580768934040"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </Button>
            <Separator className="my-2" />

            {/* X */}
            <Button asChild variant="outline" size="sm" className="justify-start gap-2 w-full">
              <a
                href="https://x.com/afrieuropa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="h-4 w-4" /> X
              </a>
            </Button>
            <Separator className="my-2" />

            {/* Instagram */}
            <Button asChild variant="outline" size="sm" className="justify-start gap-2 w-full">
              <a
                href="https://www.instagram.com/afrieuropa_news"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </Button>
            <Separator className="my-2" />

            {/* YouTube */}
            <Button asChild variant="outline" size="sm" className="justify-start gap-2 w-full">
              <a
                href="https://www.youtube.com/@AfriEuropaNews"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-4 w-4 text-red-600" /> YouTube
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
