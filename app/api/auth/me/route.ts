import { NextResponse } from "next/server";

import { getSession } from "@/app/actions/session.action";
import { mockAuthors } from "@/config/constants/mockdata";

export async function GET() {
  try {
    const session = await getSession();
    const user = mockAuthors.find((author) => author.email === session.email);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
