// app/api/rounds/[id]/reveal/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const round = await prisma.round.findUnique({ where: { id } });
    if (!round) return NextResponse.json({ error: "not found" }, { status: 404 });
    if (round.status !== "STARTED") return NextResponse.json({ error: "invalid" }, { status: 400 });

    const updated = await prisma.round.update({
      where: { id },
      data: {
        status: "REVEALED",
        serverSeed: round.serverSeed, // already there; just marking revealed
        revealedAt: new Date(),
      },
    });
    return NextResponse.json({ serverSeed: updated.serverSeed });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
