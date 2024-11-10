import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { incrementInquiryCount } from "./stats";
import type { Inquiry } from "@/types/inquiry";

// 새 문의사항 생성
export async function createInquiry(
  data: Omit<Inquiry, "id" | "createdAt" | "updatedAt" | "status">
) {
  try {
    const inquiriesRef = collection(db, "inquiries");
    const docRef = await addDoc(inquiriesRef, {
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 문의사항 수 증가
    await incrementInquiryCount();

    return {
      id: docRef.id,
      ...data,
    };
  } catch (error) {
    console.error("Error creating inquiry:", error);
    throw error;
  }
}

// 문의사항 목록 가져오기
export async function getInquiries() {
  try {
    const inquiriesRef = collection(db, "inquiries");
    const q = query(inquiriesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Inquiry[];
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    throw error;
  }
}

// 특정 문의사항 가져오기
export async function getInquiry(id: string) {
  try {
    const docRef = doc(db, "inquiries", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Inquiry;
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    throw error;
  }
}

// 문의사항 상태 업데이트
export async function updateInquiryStatus(
  id: string,
  status: Inquiry["status"]
) {
  try {
    const docRef = doc(db, "inquiries", id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString(),
    });

    return { id, status };
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    throw error;
  }
}

// 문의사항 삭제
export async function deleteInquiry(id: string) {
  try {
    const docRef = doc(db, "inquiries", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    throw error;
  }
}
