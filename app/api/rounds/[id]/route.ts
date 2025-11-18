import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/rounds/:id → return full round details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const round = await prisma.round.findUnique({
      where: { id },
    });

    if (!round) {
      return NextResponse.json(
        { error: "Round not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(round, { status: 200 });
  } catch (error) {
    console.error("GET Round Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch round" },
      { status: 500 }
    );
  }
}
