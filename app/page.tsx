"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Artwork } from "@/lib/artworks";
import { getArtworks } from "@/lib/artworks";

export default function HomePage() {
  const [latestArtworks, setLatestArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await getArtworks();
        setLatestArtworks(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="relative h-screen overflow-hidden bg-white">
        {/* 배경 이미지 */}
        <Image
          src="/images/hero.jpg"
          alt="Hero image"
          fill
          className="object-cover scale-110 animate-slow-zoom opacity-10"
          priority
        />

        {/* 움직이는 배경 패턴 */}
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 animate-slide" />

        {/* 콘텐츠 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary to-gray-600">
                LEE ARTWORK
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-gray-900 via-primary to-gray-600 mx-auto mb-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-600"
          >
            현대 미술의 새로운 시각을 제시하는 작가 이준영의 작품 포트폴리오
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="space-x-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              <Link href="/artwork">작품 보기</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-50"
            >
              <Link href="/about">작가 소개</Link>
            </Button>
          </motion.div>
        </div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-scroll-indicator mx-auto" />
          </div>
        </motion.div>
      </section>

      {/* About 섹션 */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] rounded-lg overflow-hidden"
              >
                <Image
                  src="/images/artist.jpg"
                  alt="Artist photo"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-bold">About the Artist</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-gray-900 to-gray-600" />
                <p className="text-lg text-gray-600 leading-relaxed">
                  이준영 작가는 현대 미술의 새로운 시각을 제시하며, 독특한 작품
                  세계를 구축해나가고 있습니다. 도시와 자연, 인간과 기술의
                  조화를 탐구하는 그의 작품들은 현대 사회의 복잡성을 예술적으로
                  승화시킵니다.
                </p>
                <div className="grid grid-cols-2 gap-8 py-8">
                  <div>
                    <div className="text-3xl font-bold mb-2">10+</div>
                    <div className="text-gray-600">Years of Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-gray-600">Exhibitions</div>
                  </div>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  <Link href="/about">자세히 보기</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 최신 작품 섹션 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">최신 작품</h2>
            <Link
              href="/artwork"
              className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
            >
              더보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading
              ? // 로딩 상태일 때 스켈레톤 UI 표시
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-100 rounded-lg animate-pulse"
                  />
                ))
              : // 작품 데이터 표시
                latestArtworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/artwork/${artwork.id}`}
                      className="block group"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                        <Image
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-medium mb-1">{artwork.title}</h3>
                      <p className="text-sm text-gray-600">
                        {artwork.artistName}
                      </p>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
