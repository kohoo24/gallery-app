"use client";

import * as React from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  id: string;
}

export function ViewCounter({ id }: ViewCounterProps) {
  const [views, setViews] = React.useState(() => {
    if (typeof window !== "undefined") {
      const viewCounts = localStorage.getItem("viewCounts");
      const counts = viewCounts ? JSON.parse(viewCounts) : {};
      return counts[id] || 0;
    }
    return 0;
  });

  React.useEffect(() => {
    const viewCounts = localStorage.getItem("viewCounts");
    const counts = viewCounts ? JSON.parse(viewCounts) : {};
    counts[id] = (counts[id] || 0) + 1;
    localStorage.setItem("viewCounts", JSON.stringify(counts));
    setViews(counts[id]);
  }, [id]);

  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      <Eye className="w-4 h-4" />
      <span>{views} views</span>
    </div>
  );
}
