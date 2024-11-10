"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface ArtworkFilterProps {
  years: string[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  mediums: string[];
  selectedMedium: string;
  onMediumChange: (medium: string) => void;
  onSortChange: (sort: string) => void;
}

export function ArtworkFilter({
  years,
  selectedYear,
  onYearChange,
  mediums,
  selectedMedium,
  onMediumChange,
  onSortChange,
}: ArtworkFilterProps) {
  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "oldest", label: "오래된순" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 연도 필터 */}
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-[140px] bg-white border-gray-200 hover:bg-gray-50">
          <span className="text-gray-500 text-sm">연도</span>
          <div className="flex items-center gap-1">
            <SelectValue placeholder="선택" className="text-sm" />
          </div>
        </SelectTrigger>
        <SelectContent
          align="end"
          className="w-[140px] bg-white border border-gray-200 shadow-lg"
        >
          {years.map((year) => (
            <SelectItem key={year} value={year} className="text-sm">
              {year}년
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 매체 필터 */}
      <Select value={selectedMedium} onValueChange={onMediumChange}>
        <SelectTrigger className="w-[140px] bg-white border-gray-200 hover:bg-gray-50">
          <span className="text-gray-500 text-sm">매체</span>
          <div className="flex items-center gap-1">
            <SelectValue placeholder="선택" className="text-sm" />
          </div>
        </SelectTrigger>
        <SelectContent
          align="end"
          className="w-[140px] bg-white border border-gray-200 shadow-lg"
        >
          {mediums.map((medium) => (
            <SelectItem key={medium} value={medium} className="text-sm">
              {medium}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 정렬 옵션 */}
      <div className="flex items-center gap-2">
        {sortOptions.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            size="sm"
            onClick={() => onSortChange(option.value)}
            className="bg-white border-gray-200 hover:bg-gray-50 text-sm font-normal"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
