"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Palette } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { ArtworkImageZoom } from "./ArtworkImageZoom";
import { LikeButton } from "./LikeButton";
import { ViewCounter } from "./ViewCounter";

interface ArtworkCardProps {
  id: string;
  title: string;
  artistName: string;
  imageUrl: string;
  year?: string;
  medium?: string;
  description?: string;
  view?: "grid" | "list";
}

export function ArtworkCard({
  id,
  title,
  artistName,
  imageUrl,
  year = "2024",
  medium = "Oil on canvas",
  description,
  view = "grid",
}: ArtworkCardProps) {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handlers = useSwipeable({
    onTap: () => {
      if (isMobile) {
        setIsZoomed(true);
      }
    },
  });

  if (view === "list") {
    return (
      <Link href={`/artwork/${id}`}>
        <div className="group bg-white rounded-lg overflow-hidden card-shadow hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-48 aspect-[4/3] md:aspect-square">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 z-10">
                <LikeButton id={id} />
              </div>
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-600 mb-2">{artistName}</p>
                </div>
                <div className="flex gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Palette className="w-4 h-4" />
                    <span>{medium}</span>
                  </div>
                </div>
              </div>
              {description && (
                <p className="mt-4 text-gray-600 line-clamp-2">{description}</p>
              )}
              <div className="mt-4">
                <ViewCounter id={id} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <Link href={`/artwork/${id}`}>
        <div
          className="group relative rounded-lg overflow-hidden bg-white card-shadow"
          {...handlers}
        >
          <div className="aspect-[4/5] relative">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-2 right-2 z-10">
              <LikeButton id={id} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="font-semibold text-xl text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-200 mb-1">{medium}</p>
              <p className="text-sm text-gray-300">{year}</p>
              <div className="mt-2">
                <ViewCounter id={id} />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {isZoomed && (
        <ArtworkImageZoom
          src={imageUrl}
          alt={title}
          onClose={() => setIsZoomed(false)}
        />
      )}
    </>
  );
}
