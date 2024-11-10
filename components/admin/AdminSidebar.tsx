"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    href: "/admin/dashboard",
    label: "대시보드",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/artworks",
    label: "작품 관리",
    icon: ImageIcon,
  },
  {
    href: "/admin/inquiries",
    label: "문의 관리",
    icon: MessageSquare,
  },
  {
    href: "/admin/settings",
    label: "설정",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r min-h-screen p-6">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors",
                pathname === item.href &&
                  "bg-primary text-white hover:bg-primary/90"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="mt-auto flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
