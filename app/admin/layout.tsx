"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("=== AdminLayout Effect ===");
    console.log("Current pathname:", pathname);
    console.log("Session Status:", status);
    console.log("Session Data:", session);

    // 로그인 페이지에서는 리다이렉션하지 않음
    if (pathname === "/admin/login") {
      return;
    }

    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router, pathname, session]);

  // 로그인 페이지일 경우 바로 children 렌더링
  if (pathname === "/admin/login") {
    return children;
  }

  // 로딩 중일 때
  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // 세션이 없을 때
  if (!session) {
    return <LoadingSpinner />;
  }

  // 인증된 상태
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
