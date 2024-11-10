"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, GraduationCap, Calendar } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 프로필 섹션 */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-12 items-center mb-20"
      >
        <motion.div
          variants={fadeIn}
          className="relative aspect-square rounded-lg overflow-hidden group"
        >
          <Image
            src="https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1"
            alt="이준영 작가"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
        <motion.div variants={fadeIn} className="space-y-6">
          <h1 className="text-4xl font-bold mb-6">이준영</h1>
          <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border shadow-sm">
            <p className="text-xl text-gray-600 italic">
              "자연과 도시의 경계에서 발견하는 새로운 시각"
            </p>
          </div>
          <div className="space-y-4 text-gray-600">
            <motion.p variants={fadeIn} className="leading-relaxed">
              백석예술대학교 미술학과 졸업 후, 현대 도시와 자연의 조화를 주제로
              작품 활동을 이어오고 있습니다.
            </motion.p>
            <motion.p variants={fadeIn} className="leading-relaxed">
              도시의 기하학적 구조와 자연의 유기적 형태가 만나는 지점에서
              발견되는 독특한 미학을 탐구하며, 이를 통해 현대인의 삶과 환경에
              대한 새로운 시각을 제시하고자 합니다.
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* 경력 섹션 */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-20"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-12">
          주요 경력
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={fadeIn}>
            <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 left-8 -translate-y-1/2">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-6 mt-2">학력</h3>
              <ul className="space-y-6">
                {[
                  {
                    year: "2020",
                    title: "백석예술대학교 미술학과 졸업",
                    subtitle: "Fine Arts, 우수 졸업",
                  },
                  {
                    year: "2018",
                    title: "파리예술학교 교환학생",
                    subtitle: "Contemporary Art Studies",
                  },
                ].map((edu, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:bg-primary/30 before:rounded-full"
                  >
                    <time className="text-sm text-primary/70 font-medium">
                      {edu.year}
                    </time>
                    <h4 className="text-gray-900 font-medium mt-1">
                      {edu.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">{edu.subtitle}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 left-8 -translate-y-1/2">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-6 mt-2">수상</h3>
              <ul className="space-y-6">
                {[
                  {
                    year: "2023",
                    title: "한국현대미술공모전 대상",
                    subtitle: "현대미술의 새로운 해석상",
                  },
                  {
                    year: "2022",
                    title: "신진작가상",
                    subtitle: "한국미술협회",
                  },
                  {
                    year: "2021",
                    title: "아시아현대미술상 특선",
                    subtitle: "아시아현대미술협회",
                  },
                ].map((award, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:bg-primary/30 before:rounded-full"
                  >
                    <time className="text-sm text-primary/70 font-medium">
                      {award.year}
                    </time>
                    <h4 className="text-gray-900 font-medium mt-1">
                      {award.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      {award.subtitle}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 전시 이력 섹션 */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-white rounded-2xl p-8 shadow-lg"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-12">
          전시 이력
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div variants={fadeIn}>
            <div className="relative">
              <h3 className="text-xl font-semibold mb-8 flex items-center gap-3">
                <span className="p-2 bg-primary/5 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                </span>
                개인전
              </h3>
              <div className="space-y-8">
                {[
                  {
                    year: "2024",
                    title: "경계의 풍경들",
                    location: "현대갤러리",
                    description: "도시와 자연의 경계에 대한 탐구",
                  },
                  {
                    year: "2023",
                    title: "도시의 서사",
                    location: "예술의전당",
                    description: "현대 도시의 일상적 풍경",
                  },
                  {
                    year: "2022",
                    title: "자연의 속삭임",
                    location: "갤러리 나우",
                    description: "자연의 숨겨진 이야기",
                  },
                ].map((exhibition, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-primary/20"
                  >
                    <time className="text-sm text-primary/70 font-medium">
                      {exhibition.year}
                    </time>
                    <h4 className="text-gray-900 font-medium mt-1">
                      {exhibition.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      {exhibition.location}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {exhibition.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <div className="relative">
              <h3 className="text-xl font-semibold mb-8 flex items-center gap-3">
                <span className="p-2 bg-primary/5 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                </span>
                단체전
              </h3>
              <div className="space-y-8">
                {[
                  {
                    year: "2024",
                    title: "현대미술의 지평",
                    location: "국립현대미술관",
                    description: "현대미술의 새로운 시도",
                  },
                  {
                    year: "2023",
                    title: "도시와 자연",
                    location: "서울시립미술관",
                    description: "도시와 자연의 조화",
                  },
                  {
                    year: "2023",
                    title: "KIAF",
                    location: "COEX",
                    description: "한국국제아트페어",
                  },
                  {
                    year: "2022",
                    title: "젊은모색",
                    location: "국립현대미술관",
                    description: "신진작가들의 실험적 시도",
                  },
                ].map((exhibition, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-primary/20"
                  >
                    <time className="text-sm text-primary/70 font-medium">
                      {exhibition.year}
                    </time>
                    <h4 className="text-gray-900 font-medium mt-1">
                      {exhibition.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      {exhibition.location}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {exhibition.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
