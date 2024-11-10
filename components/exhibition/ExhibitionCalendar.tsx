"use client";

import * as React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Exhibition {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

const DUMMY_EXHIBITIONS: Exhibition[] = [
  {
    id: "1",
    title: "경계의 풍경들",
    location: "현대갤러리",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    description: "도시와 자연의 경계에 대한 탐구",
  },
  {
    id: "2",
    title: "도시의 서사",
    location: "예술의전당",
    startDate: "2024-05-15",
    endDate: "2024-06-15",
    description: "현대 도시의 일상적 풍경",
  },
  // ... 더 많은 전시 데이터
];

export function ExhibitionCalendar() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">전시 일정</h2>
      <div className="space-y-8">
        {DUMMY_EXHIBITIONS.map((exhibition, index) => (
          <motion.div
            key={exhibition.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-primary/20"
          >
            <div className="flex items-center gap-2 text-sm text-primary/70 font-medium mb-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(exhibition.startDate).toLocaleDateString()} -{" "}
                {new Date(exhibition.endDate).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{exhibition.title}</h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>{exhibition.location}</span>
            </div>
            <p className="text-gray-600">{exhibition.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
