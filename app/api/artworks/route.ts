import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { NextResponse } from "next/server";

// 작품 목록 가져오기
export async function GET() {
  try {
    const artworksRef = collection(db, "artworks");
    const q = query(artworksRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const artworks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(artworks);
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json(
      { error: "Failed to fetch artworks" },
      { status: 500 }
    );
  }
}

// 새 작품 추가
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const artworksRef = collection(db, "artworks");

    const docRef = await addDoc(artworksRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, ...data });
  } catch (error) {
    console.error("Error creating artwork:", error);
    return NextResponse.json(
      { error: "Failed to create artwork" },
      { status: 500 }
    );
  }
}
