"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ThumbsUp } from "lucide-react";
import type { GuestbookEntry } from "@/lib/guestbook";
import { createGuestbookEntry, getGuestbookEntries } from "@/lib/guestbook";

interface GuestbookProps {
  artworkId: string;
}

export function Guestbook({ artworkId }: GuestbookProps) {
  const [entries, setEntries] = React.useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  // 방명록 목록 불러오기
  React.useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getGuestbookEntries(artworkId);
        setEntries(data);
      } catch (error) {
        console.error("Error fetching guestbook entries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, [artworkId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newEntry = await createGuestbookEntry({
        artworkId,
        name,
        message,
      });

      setEntries((prev) => [newEntry, ...prev]);
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error creating guestbook entry:", error);
      alert("방명록 작성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">방명록</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <textarea
            placeholder="메시지를 남겨주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "작성 중..." : "작성하기"}
        </Button>
      </form>

      <div className="space-y-4">
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-b border-gray-100 pb-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{entry.likes}</span>
                </div>
              </div>
              <p className="text-gray-600">{entry.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {entries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            아직 작성된 방명록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
