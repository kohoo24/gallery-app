"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoriteContext";
import { motion, AnimatePresence } from "framer-motion";

interface LikeButtonProps {
  id: string;
}

export function LikeButton({ id }: LikeButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className={`transition-colors ${
            isLiked ? "text-red-500" : "text-gray-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
