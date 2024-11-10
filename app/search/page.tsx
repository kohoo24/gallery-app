"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import type { Artwork } from "@/lib/artworks";
import { getArtworks } from "@/lib/artworks";

export default function SearchPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  const filteredArtworks = artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-center mb-8">작품 검색</h1>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>

      {searchQuery ? (
        <>
          <p className="text-gray-600 mb-8">
            &quot;{searchQuery}&quot;에 대한 검색 결과 {filteredArtworks.length}
            건
          </p>
          <ArtworkGrid artworks={filteredArtworks} view="grid" />
          {filteredArtworks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          검색어를 입력해주세요.
        </div>
      )}
    </div>
  );
}
