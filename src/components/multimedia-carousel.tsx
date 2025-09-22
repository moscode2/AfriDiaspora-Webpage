import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Headphones } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./Ui/card";
import { Badge } from "./Ui/badge";

interface MultimediaItem {
  id: string;
  title: string;
  type: 'video' | 'podcast' | 'photo-gallery';
  thumbnail: string;
  duration?: string;
  description: string;
  url: string;
}

interface MultimediaCarouselProps {
  items: MultimediaItem[];
  title?: string;
}

export function MultimediaCarousel({ items, title = "Multimedia" }: MultimediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (items.length === 0) return null;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, items.length - 2));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, items.length - 2)) % Math.max(1, items.length - 2));
  };

  const getIcon = (type: MultimediaItem['type']) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'podcast':
        return <Headphones className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: MultimediaItem['type']) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'podcast':
        return 'Podcast';
      case 'photo-gallery':
        return 'Gallery';
      default:
        return '';
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prev}
            disabled={items.length <= 3}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={next}
            disabled={items.length <= 3}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {items.map((item) => (
            <Card key={item.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
              <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" className="gap-2">
                    {getIcon(item.type)}
                    {item.type === 'video' ? 'Watch' : item.type === 'podcast' ? 'Listen' : 'View'}
                  </Button>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="gap-1">
                    {getIcon(item.type)}
                    {getTypeLabel(item.type)}
                  </Badge>
                </div>
                {item.duration && (
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary">{item.duration}</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold leading-tight mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}