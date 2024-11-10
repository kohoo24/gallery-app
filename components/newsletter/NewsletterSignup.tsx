"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export function NewsletterSignup() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // 실제로는 여기에 API 호출이 들어갈 것입니다
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus("success");
    setEmail("");

    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/5 rounded-lg">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">뉴스레터 구독</h3>
      </div>
      <p className="text-gray-600 mb-6">
        새로운 작품 소식과 전시 일정을 이메일로 받아보세요.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="이메일 주소를 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
          disabled={status === "loading"}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? "구독 중..." : "구독하기"}
        </Button>
      </form>
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm"
        >
          구독이 완료되었습니다. 감사합니다!
        </motion.div>
      )}
    </div>
  );
}
