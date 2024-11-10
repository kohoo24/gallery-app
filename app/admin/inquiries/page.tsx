"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Mail, Phone, Calendar, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Inquiry } from "@/types/inquiry";
import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "@/lib/inquiries";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<
    "all" | Inquiry["status"]
  >("all");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState<string | null>(null);

  // 문의사항 목록 불러오기
  React.useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getInquiries();
        setInquiries(data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        alert("문의사항을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // 문의사항 상태 변경
  const handleStatusChange = async (
    id: string,
    newStatus: Inquiry["status"]
  ) => {
    setIsUpdating(id);
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
        )
      );
    } catch (error) {
      console.error("Error updating inquiry status:", error);
      alert("상태 변경 중 오류가 발생했습니다.");
    } finally {
      setIsUpdating(null);
    }
  };

  // 문의사항 삭제
  const handleDelete = async (id: string) => {
    if (!window.confirm("정말 이 문의사항을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 필터링된 문의사항
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">문의사항 관리</h1>
        <p className="text-gray-600">고객 문의를 관리합니다.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "pending", "completed", "rejected"] as const).map(
              (status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status === "all"
                    ? "전체"
                    : status === "pending"
                    ? "대기 중"
                    : status === "completed"
                    ? "완료"
                    : "거절"}
                </Button>
              )
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredInquiries.map((inquiry, index) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{inquiry.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        inquiry.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : inquiry.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {inquiry.status === "pending"
                        ? "대기 중"
                        : inquiry.status === "completed"
                        ? "완료"
                        : "거절"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{inquiry.message}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {inquiry.email}
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {inquiry.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600"
                    onClick={() => handleStatusChange(inquiry.id, "completed")}
                    disabled={isUpdating === inquiry.id}
                  >
                    {isUpdating === inquiry.id ? (
                      <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                    onClick={() => handleStatusChange(inquiry.id, "rejected")}
                    disabled={isUpdating === inquiry.id}
                  >
                    {isUpdating === inquiry.id ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredInquiries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              문의사항이 없습니다.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
