"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  Image as ImageIcon,
  MessageSquare,
  Users,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Stats } from "@/types/stats";
import { StatsChart } from "@/components/admin/StatsChart";

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statItems = [
    {
      title: "총 작품 수",
      value: stats?.totalArtworks.toString() || "0",
      icon: ImageIcon,
    },
    {
      title: "문의 건수",
      value: stats?.totalInquiries.toString() || "0",
      icon: MessageSquare,
    },
    {
      title: "방문자 수",
      value: stats?.visitors.toLocaleString() || "0",
      icon: Users,
    },
    {
      title: "조회수",
      value: stats?.views.toLocaleString() || "0",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-gray-600">웹사이트 현황을 한눈에 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/5 rounded-lg">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">통계</h2>
          <StatsChart dailyStats={stats?.dailyStats || []} />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">최근 문의</h2>
          <div className="space-y-4">
            <div className="text-center py-12 text-gray-500">
              최근 문의사항이 없습니다.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
