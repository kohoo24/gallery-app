import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUwJo0UCpC1iJgbd896RtCulHUGYGMNL8",
  authDomain: "gallery-app-623bf.firebaseapp.com",
  projectId: "gallery-app-623bf",
  storageBucket: "gallery-app-623bf.firebasestorage.app",
  messagingSenderId: "295431613436",
  appId: "1:295431613436:web:af36cb31d7c065e6fee079",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createAdmin() {
  const email = "admin@example.com";
  const password = "admin1234";

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 사용자 프로필 업데이트
    await updateProfile(user, {
      displayName: "관리자",
    });

    console.log("관리자 계정이 생성되었습니다:", {
      id: user.uid,
      email: user.email,
      name: user.displayName,
    });
  } catch (error) {
    console.error("관리자 계정 생성 중 오류 발생:", error);
  }
}

createAdmin();
