"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatsChartProps {
  dailyStats: {
    date: string;
    visitors: number;
    views: number;
  }[];
}

export function StatsChart({ dailyStats }: StatsChartProps) {
  const data = {
    labels: dailyStats.map((stat) =>
      new Date(stat.date).toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      })
    ),
    datasets: [
      {
        label: "방문자 수",
        data: dailyStats.map((stat) => stat.visitors),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.3,
      },
      {
        label: "조회수",
        data: dailyStats.map((stat) => stat.views),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "일별 통계",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}
