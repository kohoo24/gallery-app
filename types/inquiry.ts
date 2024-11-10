export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  artworkId?: string;
  artworkTitle?: string;
  status: "pending" | "completed" | "rejected";
  createdAt: string;
  updatedAt: string;
}
