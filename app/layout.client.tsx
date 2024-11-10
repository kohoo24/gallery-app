"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { updateStats } from "@/lib/stats";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // 새로운 페이지 방문 시 통계 업데이트
    updateStats("visit");
  }, [pathname]);

  return (
    <html lang="ko">
      <body className="antialiased">
        <SessionProvider>
          <FavoriteProvider>
            <Header />
            <ScrollProgress />
            <div className="relative pt-16">
              <PageTransition>{children}</PageTransition>
            </div>
          </FavoriteProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
