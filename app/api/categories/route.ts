import { mockCategories } from "@/config/constants/mockdata";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ 
      data: mockCategories, 
      success: true 
    });
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}