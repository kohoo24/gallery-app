"use client";

import * as React from "react";

interface FavoriteContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoriteContext = React.createContext<FavoriteContextType | undefined>(
  undefined
);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  // 초기 상태 로드
  React.useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    setMounted(true);
  }, []);

  // favorites가 변경될 때만 localStorage 업데이트
  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  // Hook들을 최상위 레벨에서 선언
  const toggleFavorite = React.useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = React.useCallback(
    (id: string) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  // 컨텍스트 값을 메모이제이션
  const contextValue = React.useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, isFavorite]
  );

  if (!mounted) {
    return null;
  }

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = React.useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
}
