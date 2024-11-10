"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { updateStats } from "@/lib/stats";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const handleVisit = async () => {
      // 세션 스토리지에서 마지막 방문 시간 확인
      const lastVisit = sessionStorage.getItem("lastVisit");
      const now = new Date().getTime();

      // 30분(1800000ms) 이내에 재방문이면 카운트하지 않음
      if (lastVisit && now - parseInt(lastVisit) < 1800000) {
        return;
      }

      try {
        await updateStats("visit");
        // 현재 시간을 마지막 방문 시간으로 저장
        sessionStorage.setItem("lastVisit", now.toString());
      } catch (error) {
        console.error("Error updating visit stats:", error);
      }
    };

    handleVisit();
  }, []); // pathname 의존성 제거

  // 페이지 뷰는 매번 카운트
  useEffect(() => {
    const handleView = async () => {
      try {
        await updateStats("view");
      } catch (error) {
        console.error("Error updating view stats:", error);
      }
    };

    handleView();
  }, [pathname]);

  return null;
}
