"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/artwork", label: "Artwork" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [showAdmin, setShowAdmin] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  // 로고를 5번 빠르게 클릭하면 관리자 버튼 표시
  const handleLogoClick = () => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < 500) {
      // 500ms 이내에 클릭
      setClickCount((prev) => prev + 1);
      if (clickCount + 1 >= 5) {
        setShowAdmin(true);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(currentTime);
  };

  // 페이지 이동 시 관리자 버튼 숨기기
  useEffect(() => {
    setShowAdmin(false);
    setClickCount(0);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold gradient-text"
            onClick={handleLogoClick}
          >
            LEE ARTWORK
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-gray-600"
                )}
              >
                {item.label}
              </Link>
            ))}
            {showAdmin && (
              <Link
                href="/admin/login"
                className="text-sm font-medium text-gray-400 hover:text-primary transition-colors"
              >
                Admin
              </Link>
            )}
            <Link
              href="/search"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
          </nav>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
