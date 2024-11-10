import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";

export interface GuestbookEntry {
  id: string;
  artworkId: string;
  name: string;
  message: string;
  likes: number;
  createdAt: string;
}

export async function createGuestbookEntry(
  data: Omit<GuestbookEntry, "id" | "likes" | "createdAt">
) {
  try {
    const guestbookRef = collection(db, "guestbook");
    const docRef = await addDoc(guestbookRef, {
      ...data,
      likes: 0,
      createdAt: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...data,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    throw error;
  }
}

export async function getGuestbookEntries(artworkId: string) {
  try {
    const guestbookRef = collection(db, "guestbook");
    const q = query(
      guestbookRef,
      where("artworkId", "==", artworkId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as GuestbookEntry[];
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    throw error;
  }
}
