"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Share2, Ruler, Frame, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArtworkImageSlider } from "@/components/artwork/ArtworkImageSlider";
import { RelatedArtworkCard } from "@/components/artwork/RelatedArtworkCard";
import { PurchaseInquiry } from "@/components/artwork/PurchaseInquiry";
import { getArtwork, getArtworks } from "@/lib/artworks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { updateStats } from "@/lib/stats";
import type { Artwork } from "@/lib/artworks";
import { Guestbook } from "@/components/guestbook/Guestbook";

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [artwork, setArtwork] = React.useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = React.useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching artwork data for id:", params.id);
        setIsLoading(true);

        // 작품 데이터 가져오기
        const artworkData = await getArtwork(params.id);
        console.log("Fetched artwork data:", artworkData);

        if (!artworkData) {
          console.log("No artwork data found");
          setError("작품을 찾을 수 없습니다.");
          setIsLoading(false);
          return;
        }

        setArtwork(artworkData);

        // 관련 작품 가져오기
        const allArtworks = await getArtworks();
        console.log("Fetched all artworks:", allArtworks);

        const related = allArtworks
          .filter(
            (art) =>
              art.id !== params.id &&
              (art.tags?.some((tag) => artworkData.tags?.includes(tag)) ||
                art.medium === artworkData.medium)
          )
          .slice(0, 4);

        console.log("Related artworks:", related);
        setRelatedArtworks(related);
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError("작품을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{error}</h2>
          <Button asChild>
            <Link href="/artwork">작품 목록으로</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다.");
    } catch (error) {
      console.error("공유하기 실패:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        size="default"
        asChild
        className="mb-8 hover:bg-transparent"
      >
        <Link href="/artwork" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          작품 목록으로
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <ArtworkImageSlider images={artwork.images} title={artwork.title} />
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">{artwork.title}</h1>
              <p className="text-gray-600 mb-2">{artwork.artistName}</p>
              <p className="text-gray-600 mb-2">{artwork.year}</p>
              <p className="text-gray-600">{artwork.medium}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="hover:bg-gray-100"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <PurchaseInquiry
                artworkTitle={artwork.title}
                artworkId={artwork.id}
              />
            </div>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="description">
              <AccordionTrigger>작품 설명</AccordionTrigger>
              <AccordionContent>
                <div className="text-gray-600 leading-relaxed">
                  {artwork.description || "작품 설명이 준비 중입니다."}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger>작품 상세 정보</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-gray-500" />
                    <span>크기: {artwork.details.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Frame className="w-5 h-5 text-gray-500" />
                    <span>
                      프레임: {artwork.details.frame || "프레임 없음"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium mb-2">사용 재료:</p>
                    <div className="flex flex-wrap gap-2">
                      {artwork.details.materials.map((material: string) => (
                        <span
                          key={material}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="exhibitions">
              <AccordionTrigger>전시 이력</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600">
                  {artwork.exhibitions.map((exhibition, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{exhibition.title}</p>
                        <p className="text-sm text-gray-500">
                          {exhibition.location}
                        </p>
                      </div>
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                        {exhibition.year}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* 관련 작품 섹션 */}
      {relatedArtworks.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">관련 작품</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedArtworks.map((relatedArtwork) => (
              <RelatedArtworkCard
                key={relatedArtwork.id}
                artwork={relatedArtwork}
              />
            ))}
          </div>
        </div>
      )}

      {/* 방명록 섹션 */}
      <div className="mt-16">
        <Guestbook artworkId={artwork.id} />
      </div>
    </div>
  );
}
