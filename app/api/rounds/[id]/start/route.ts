// app/api/rounds/[id]/start/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateCombined } from "@/lib/fairness";
import { createPRNG } from "@/lib/rng";
import { runEngine } from "@/lib/engine";

export async function POST(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const body = await req.json();
    const { clientSeed, betCents = 0, dropColumn = 6 } = body;

    if (!clientSeed) return NextResponse.json({ error: "clientSeed required" }, { status: 400 });

    const round = await prisma.round.findUnique({ where: { id } });
    if (!round) return NextResponse.json({ error: "round not found" }, { status: 404 });
    if (round.status !== "CREATED") return NextResponse.json({ error: "invalid status" }, { status: 400 });

    const combinedSeed = generateCombined(round.serverSeed!, clientSeed, round.nonce);
    const prng = createPRNG(combinedSeed);

    const { pegMap, pegMapHash, path, binIndex } = runEngine({ rows: 12, dropColumn, prng });

    const payoutTable = [5, 2, 1.5, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.5, 2, 5];
    const payoutMultiplier = payoutTable[binIndex] ?? 1;

    const updated = await prisma.round.update({
      where: { id },
      data: {
        status: "STARTED",
        clientSeed,
        combinedSeed,
        pegMapHash,
        dropColumn,
        binIndex,
        rows: 12,
        betCents,
        payoutMultiplier,
        pathJson: JSON.stringify(path),
      },
    });

    return NextResponse.json({
      roundId: updated.id,
      pegMapHash,
      path,
      binIndex,
      payoutMultiplier,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
