"use client";

import * as React from "react";
import { Mail, Phone, MapPin, Instagram, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-gray-600">
            작품 구매 및 전시 문의는 아래 연락처로 부탁드립니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <motion.div className="space-y-8" variants={fadeIn}>
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
              <motion.div className="space-y-6" variants={staggerContainer}>
                <motion.div
                  className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 bg-primary/5 rounded-full">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <a
                    href="mailto:contact@example.com"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    contact@example.com
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 bg-primary/5 rounded-full">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <a
                    href="tel:+82-10-1234-5678"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    010-1234-5678
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 bg-primary/5 rounded-full">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-gray-600">
                    서울특별시 강남구 테헤란로 123
                  </span>
                </motion.div>
              </motion.div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Social Media</h2>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://instagram.com" target="_blank">
                      <Instagram className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://twitter.com" target="_blank">
                      <Twitter className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 문의 양식 */}
          <motion.div
            variants={fadeIn}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow duration-200"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow duration-200"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  메시지
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow duration-200"
                  required
                ></textarea>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "전송 중..."
                ) : (
                  <>
                    보내기
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 text-green-700 rounded-md"
              >
                메시지가 성공적으로 전송되었습니다.
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
