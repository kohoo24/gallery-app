import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/lib/data";

interface RelatedArtworkCardProps {
  artwork: Artwork;
}

export function RelatedArtworkCard({ artwork }: RelatedArtworkCardProps) {
  return (
    <Link href={`/artwork/${artwork.id}`}>
      <div className="group relative rounded-lg overflow-hidden bg-white card-shadow">
        <div className="aspect-[4/3] relative">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="font-medium text-white">{artwork.title}</h3>
            <p className="text-sm text-gray-200">{artwork.year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
