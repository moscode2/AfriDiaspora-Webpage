// src/components/TrendingSidebar.tsx
import { Link } from "react-router-dom";
import { TrendingUp, Heart, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "./Ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./Ui/card";
import { Separator } from "./Ui/separator";
import { useFirestoreData } from "../Hooks/usefirestoredata";

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
          <Button className="w-full" size="sm">
            Support AfriEuropa News
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
            <Button variant="outline" size="sm" className="justify-start gap-2 w-full">
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>
            <Separator className="my-2" />

            <Button variant="outline" size="sm" className="justify-start gap-2 w-full">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
            <Separator className="my-2" />

            <Button variant="outline" size="sm" className="justify-start gap-2 w-full">
              <Youtube className="h-4 w-4" />
              YouTube
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
