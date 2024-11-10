import * as React from "react";
import { ArtworkCard } from "./ArtworkCard";
import type { Artwork } from "@/lib/artworks";

interface ArtworkGridProps {
  artworks: Artwork[];
  view: "grid" | "list";
}

export function ArtworkGrid({ artworks, view }: ArtworkGridProps) {
  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "flex flex-col gap-6"
      }
    >
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} {...artwork} view={view} />
      ))}
    </div>
  );
}
