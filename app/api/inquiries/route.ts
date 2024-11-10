import { createInquiry, getInquiries } from "@/lib/inquiries";
import { NextResponse } from "next/server";

// 문의사항 목록 가져오기
export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

// 새 문의사항 추가
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const inquiry = await createInquiry(data);
    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    );
  }
}
