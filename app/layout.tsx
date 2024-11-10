import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEE ARTWORK | 이준영 작가 포트폴리오",
  description: "현대 미술 작가 이준영의 작품 포트폴리오 웹사이트입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <SessionProvider>
          <FavoriteProvider>
            <VisitorTracker />
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
