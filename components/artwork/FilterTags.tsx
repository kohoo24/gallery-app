"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterTagsProps {
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function FilterTags({
  allTags,
  selectedTags,
  onTagsChange,
}: FilterTagsProps) {
  if (selectedTags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      <span className="text-sm text-gray-500">필터:</span>
      {selectedTags.map((tag) => (
        <Button
          key={tag}
          variant="outline"
          size="sm"
          className="gap-2 bg-white"
          onClick={() => onTagsChange(selectedTags.filter((t) => t !== tag))}
        >
          {tag}
          <X className="h-3 w-3" />
        </Button>
      ))}
      {selectedTags.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onTagsChange([])}
          className="text-gray-500"
        >
          초기화
        </Button>
      )}
    </div>
  );
}
