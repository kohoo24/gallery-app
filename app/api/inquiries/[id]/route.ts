import {
  getInquiry,
  updateInquiryStatus,
  deleteInquiry,
} from "@/lib/inquiries";
import { NextResponse } from "next/server";

// 특정 문의사항 가져오기
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const inquiry = await getInquiry(params.id);

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiry" },
      { status: 500 }
    );
  }
}

// 문의사항 상태 업데이트
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const result = await updateInquiryStatus(params.id, status);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

// 문의사항 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteInquiry(params.id);
    return NextResponse.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
