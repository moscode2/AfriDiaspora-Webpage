// src/components/multimedia-carousel.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Headphones, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MultimediaItem as MultimediaType } from "../Hooks/usefirestoredata";

interface MultimediaCarouselProps {
  items: MultimediaType[];
  title?: string;
}

export function MultimediaCarousel({ items, title = "Multimedia" }: MultimediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeItem, setActiveItem] = useState<MultimediaType | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!items || items.length === 0) return <p>No multimedia available.</p>;

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const getIcon = (type: MultimediaType["type"]) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "podcast":
        return <Headphones className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: MultimediaType["type"]) => {
    switch (type) {
      case "video":
        return "Video";
      case "podcast":
        return "Podcast";
      case "photo-gallery":
        return "Gallery";
      default:
        return "";
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prev} disabled={items.length <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={next} disabled={items.length <= 1}>
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
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                      setActiveItem(item);
                      setGalleryIndex(0);
                    }}
                  >
                    {getIcon(item.type)}
                    {item.type === "video" ? "Watch" : item.type === "podcast" ? "Listen" : "View"}
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
                <h3 className="font-semibold leading-tight mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for Multimedia Playback */}
      {activeItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl bg-background rounded-lg overflow-hidden">
            <button
              className="absolute top-3 right-3 text-white"
              onClick={() => setActiveItem(null)}
            >
              <X className="h-6 w-6" />
            </button>

            {activeItem.type === "video" && (
              <div className="w-full aspect-video">
                <iframe
                  className="w-full h-full"
                  src={activeItem.url}
                  title={activeItem.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {activeItem.type === "podcast" && (
              <audio controls autoPlay className="w-full mt-4">
                <source src={activeItem.url} />
                Your browser does not support the audio element.
              </audio>
            )}

            {activeItem.type === "photo-gallery" && (
              <div className="relative w-full h-[480px] flex items-center justify-center bg-black">
                <img
                  src={Array.isArray(activeItem.url) ? activeItem.url[galleryIndex] : activeItem.url}
                  alt={`Slide ${galleryIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
                {Array.isArray(activeItem.url) && activeItem.url.length > 1 && (
                  <>
                    <Button
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                      onClick={() => setGalleryIndex((galleryIndex - 1 + activeItem.url.length) % activeItem.url.length)}
                    >
                      {"<"}
                    </Button>
                    <Button
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setGalleryIndex((galleryIndex + 1) % activeItem.url.length)}
                    >
                      {">"}
                    </Button>
                  </>
                )}
              </div>
            )}

            <div className="p-4">
              <h3 className="font-bold text-xl">{activeItem.title}</h3>
              <p className="text-sm text-muted-foreground">{activeItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}