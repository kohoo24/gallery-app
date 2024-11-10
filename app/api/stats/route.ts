import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// 통계 데이터 가져오기
export async function GET() {
  try {
    const statsRef = doc(db, "stats", "main");
    const docSnap = await getDoc(statsRef);

    if (!docSnap.exists()) {
      // 초기 통계 데이터 생성
      const initialStats = {
        totalArtworks: 0,
        totalInquiries: 0,
        visitors: 0,
        views: 0,
        lastUpdated: new Date().toISOString(),
        dailyStats: [],
        monthlyStats: [],
      };

      return NextResponse.json(initialStats);
    }

    return NextResponse.json(docSnap.data());
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
