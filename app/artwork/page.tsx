"use client";

import { useEffect, useState } from "react";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { ArtworkFilter } from "@/components/artwork/ArtworkFilter";
import { ViewToggle } from "@/components/artwork/ViewToggle";
import { FilterTags } from "@/components/artwork/FilterTags";
import type { Artwork } from "@/lib/artworks";
import { getArtworks } from "@/lib/artworks";

export default function ArtworkPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMedium, setSelectedMedium] = useState<string>("");

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await getArtworks();
        setArtworks(data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // 모든 태그 추출
  const allTags = Array.from(
    new Set(artworks.flatMap((artwork) => artwork.tags))
  );

  // 모든 연도 추출
  const allYears = Array.from(
    new Set(artworks.map((artwork) => artwork.year))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  // 모든 매체 추출
  const allMediums = Array.from(
    new Set(artworks.map((artwork) => artwork.medium))
  );

  // 필터링된 작품 목록
  const filteredArtworks = artworks.filter((artwork) => {
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => artwork.tags.includes(tag));
    const matchesYear = !selectedYear || artwork.year === selectedYear;
    const matchesMedium = !selectedMedium || artwork.medium === selectedMedium;
    return matchesTags && matchesYear && matchesMedium;
  });

  const handleSortChange = (sort: string) => {
    const sortedArtworks = [...artworks];
    if (sort === "latest") {
      sortedArtworks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      sortedArtworks.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    setArtworks(sortedArtworks);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">작품</h1>
        <div className="flex items-center gap-4">
          <ArtworkFilter
            years={allYears}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            mediums={allMediums}
            selectedMedium={selectedMedium}
            onMediumChange={setSelectedMedium}
            onSortChange={handleSortChange}
          />
          <ViewToggle view={view} onViewChange={setView} />
        </div>
      </div>

      <FilterTags
        allTags={allTags}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />

      <ArtworkGrid artworks={filteredArtworks} view={view} />
    </div>
  );
}
