"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getArtwork, updateArtwork } from "@/lib/artworks";
import { uploadMultipleImages } from "@/lib/storage";
import type { Artwork } from "@/lib/artworks";

interface EditArtworkPageProps {
  params: {
    id: string;
  };
}

export default function EditArtworkPage({ params }: EditArtworkPageProps) {
  const router = useRouter();
  const [artwork, setArtwork] = React.useState<Artwork | null>(null);
  const [images, setImages] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    artistName: "",
    year: "",
    medium: "",
    description: "",
    tags: "",
  });

  // 작품 데이터 불러오기
  React.useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const data = await getArtwork(params.id);
        if (!data) {
          alert("작품을 찾을 수 없습니다.");
          router.push("/admin/artworks");
          return;
        }
        setArtwork(data);
        setPreviews(data.images || []);
        setFormData({
          title: data.title || "",
          artistName: data.artistName || "",
          year: data.year || "",
          medium: data.medium || "",
          description: data.description || "",
          tags: (data.tags || []).join(", "),
        });
      } catch (error) {
        console.error("Error fetching artwork:", error);
        alert("작품 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchArtwork();
  }, [params.id, router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImages((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!artwork) return;

    setIsSubmitting(true);

    try {
      // 1. 새로운 이미지 업로드
      let imageUrls = [...artwork.images];
      if (images.length > 0) {
        const urls = await uploadMultipleImages(images);
        imageUrls = [...imageUrls, ...urls];
      }

      // 2. 작품 데이터 업데이트
      const artworkData = {
        ...formData,
        images: imageUrls,
        imageUrl: imageUrls[0], // 대표 이미지
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        details: artwork.details, // 기존 상세 정보 유지
        exhibitions: artwork.exhibitions, // 기존 전시 정보 유지
      };

      await updateArtwork(params.id, artworkData);
      router.push("/admin/artworks");
    } catch (error) {
      console.error("Error updating artwork:", error);
      alert("작품 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!artwork) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </Button>
        <div>
          <h1 className="text-2xl font-bold">작품 수정</h1>
          <p className="text-gray-600">작품 정보를 수정합니다.</p>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 이미지 업로드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              작품 이미지
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AnimatePresence>
                {previews.map((preview, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={preview}
                      alt={`Artwork preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="sr-only"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">이미지 추가</span>
                </div>
              </label>
            </div>
          </div>

          {/* 작품 정보 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                작품명
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                작가명
              </label>
              <input
                type="text"
                name="artistName"
                value={formData.artistName}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제작 연도
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                매체
              </label>
              <input
                type="text"
                name="medium"
                value={formData.medium}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* 작품 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              작품 설명
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            ></textarea>
          </div>

          {/* 태그 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              태그
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="쉼표로 구분하여 입력"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "수정 중..." : "수정 완료"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
