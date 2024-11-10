import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore";

interface DailyStat {
  date: string;
  visitors: number;
  views: number;
}

interface MonthlyStat {
  month: string;
  visitors: number;
  views: number;
}

interface Stats {
  totalArtworks: number;
  totalInquiries: number;
  visitors: number;
  views: number;
  lastUpdated: string;
  dailyStats: DailyStat[];
  monthlyStats: MonthlyStat[];
}

export async function updateStats(type: "view" | "visit") {
  try {
    const statsRef = doc(db, "stats", "main");
    const docSnap = await getDoc(statsRef);

    if (!docSnap.exists()) {
      return null;
    }

    const today = new Date().toISOString().split("T")[0];
    const dailyStats = docSnap.data().dailyStats || [];
    const todayStats = dailyStats.find((stat: any) => stat.date === today);

    if (todayStats) {
      await updateDoc(statsRef, {
        [type === "view" ? "views" : "visitors"]: increment(1),
        dailyStats: dailyStats.map((stat: any) => {
          if (stat.date === today) {
            return {
              ...stat,
              [type === "view" ? "views" : "visitors"]:
                stat[type === "view" ? "views" : "visitors"] + 1,
            };
          }
          return stat;
        }),
      });
    } else {
      const newDailyStats = [
        ...dailyStats,
        {
          date: today,
          views: type === "view" ? 1 : 0,
          visitors: type === "visit" ? 1 : 0,
        },
      ];

      await updateDoc(statsRef, {
        [type === "view" ? "views" : "visitors"]: increment(1),
        dailyStats: newDailyStats,
      });
    }

    return true;
  } catch (error) {
    console.error("Error updating stats:", error);
    return null;
  }
}

export async function incrementArtworkCount() {
  try {
    const statsRef = doc(db, "stats", "main");
    const docSnap = await getDoc(statsRef);

    if (!docSnap.exists()) {
      return null;
    }

    await updateDoc(statsRef, {
      totalArtworks: increment(1),
      lastUpdated: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("Error incrementing artwork count:", error);
    return null;
  }
}

export async function incrementInquiryCount() {
  try {
    const statsRef = doc(db, "stats", "main");
    const docSnap = await getDoc(statsRef);

    if (!docSnap.exists()) {
      return null;
    }

    await updateDoc(statsRef, {
      totalInquiries: increment(1),
      lastUpdated: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("Error incrementing inquiry count:", error);
    return null;
  }
}
