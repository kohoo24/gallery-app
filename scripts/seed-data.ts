import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { DUMMY_ARTWORKS } from "@/lib/data";

async function seedArtworks() {
  try {
    console.log("Seeding artworks...");
    const artworksRef = collection(db, "artworks");

    for (const artwork of DUMMY_ARTWORKS) {
      const { id, ...artworkData } = artwork;
      await addDoc(artworksRef, {
        ...artworkData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding artworks:", error);
  }
}

seedArtworks();
