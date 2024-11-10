import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initStats() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const currentMonth = today.substring(0, 7); // YYYY-MM

    const statsRef = doc(db, "stats", "main");
    await setDoc(statsRef, {
      totalArtworks: 0,
      totalInquiries: 0,
      visitors: 0,
      views: 0,
      lastUpdated: new Date().toISOString(),
      dailyStats: [
        {
          date: today,
          visitors: 0,
          views: 0,
        },
      ],
      monthlyStats: [
        {
          month: currentMonth,
          visitors: 0,
          views: 0,
        },
      ],
    });

    console.log("통계 데이터가 초기화되었습니다.");
  } catch (error) {
    console.error("통계 데이터 초기화 중 오류 발생:", error);
  }
}

initStats();
