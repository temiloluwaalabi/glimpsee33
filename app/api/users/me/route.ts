import { mockCurrentUser } from "@/config/constants/mockdata";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ 
      data: mockCurrentUser, 
      success: true 
    });
  } catch (error) {
    console.error('User API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
