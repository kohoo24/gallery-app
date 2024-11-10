import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

// 샘플 문의사항 데이터
const SAMPLE_INQUIRIES = [
  {
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    message: "작품 구매에 대해 문의드립니다.",
    status: "pending",
    artworkId: "artwork1",
    artworkTitle: "도시의 새벽",
  },
  {
    name: "김철수",
    email: "kim@example.com",
    phone: "010-8765-4321",
    message: "전시 일정이 궁금합니다.",
    status: "completed",
  },
  {
    name: "이영희",
    email: "lee@example.com",
    message: "작품 크기를 알고 싶습니다.",
    status: "pending",
    artworkId: "artwork2",
    artworkTitle: "바다의 노래",
  },
];

async function seedInquiries() {
  try {
    // 문의사항 데이터 저장
    const inquiriesRef = collection(db, "inquiries");
    for (const inquiry of SAMPLE_INQUIRIES) {
      const docRef = await addDoc(inquiriesRef, {
        ...inquiry,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      console.log(`문의사항 "${inquiry.message}" 저장 완료 (ID: ${docRef.id})`);
    }

    console.log("모든 문의사항 데이터가 성공적으로 저장되었습니다.");
  } catch (error) {
    console.error("데이터 저장 중 오류 발생:", error);
  }
}

seedInquiries();
