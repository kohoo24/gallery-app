import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { DUMMY_ARTWORKS } from "@/lib/data";
import type { Artwork as DataArtwork } from "@/lib/data";

// Firestore용 Artwork 타입 정의
export interface Artwork extends DataArtwork {
  createdAt: string;
  updatedAt: string;
}

// 작품 목록 가져오기
export async function getArtworks(): Promise<Artwork[]> {
  try {
    console.log("Fetching artworks...");
    const artworksRef = collection(db, "artworks");
    const q = query(artworksRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // 더미 데이터에 createdAt과 updatedAt 추가
      return DUMMY_ARTWORKS.map((artwork) => ({
        ...artwork,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Artwork[];
  } catch (error) {
    console.error("Error fetching artworks:", error);
    // 더미 데이터에 createdAt과 updatedAt 추가
    return DUMMY_ARTWORKS.map((artwork) => ({
      ...artwork,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }
}

// 특정 작품 가져오기
export async function getArtwork(id: string): Promise<Artwork | null> {
  try {
    console.log("Fetching artwork with id:", id);
    const docRef = doc(db, "artworks", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // 더미 데이터에서 찾기
      const dummyArtwork = DUMMY_ARTWORKS.find((art) => art.id === id);
      if (dummyArtwork) {
        return {
          ...dummyArtwork,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Artwork;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    throw error;
  }
}

// 작품 생성
export async function createArtwork(
  data: Omit<Artwork, "id" | "createdAt" | "updatedAt">
) {
  try {
    const artworksRef = collection(db, "artworks");
    const docRef = await addDoc(artworksRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...data,
    };
  } catch (error) {
    console.error("Error creating artwork:", error);
    throw error;
  }
}

// 작품 수정
export async function updateArtwork(
  id: string,
  data: Partial<Omit<Artwork, "id" | "createdAt" | "updatedAt">>
) {
  try {
    const docRef = doc(db, "artworks", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return {
      id,
      ...data,
    };
  } catch (error) {
    console.error("Error updating artwork:", error);
    throw error;
  }
}

// 작품 삭제
export async function deleteArtwork(id: string) {
  try {
    const docRef = doc(db, "artworks", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting artwork:", error);
    throw error;
  }
}
