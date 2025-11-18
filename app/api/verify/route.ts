// app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateCommit, generateCombined } from "@/lib/fairness";
import { createPRNG } from "@/lib/rng";
import { runEngine } from "@/lib/engine";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const serverSeed = url.searchParams.get("serverSeed") || "";
  const clientSeed = url.searchParams.get("clientSeed") || "";
  const nonce = url.searchParams.get("nonce") || "";
  const dropColumn = parseInt(url.searchParams.get("dropColumn") || "6", 10);

  if (!serverSeed || !clientSeed || !nonce) return NextResponse.json({ error: "missing" }, { status: 400 });

  const commitHex = generateCommit(serverSeed, nonce);
  const combined = generateCombined(serverSeed, clientSeed, nonce);
  const prng = createPRNG(combined);
  const { pegMapHash, path, binIndex } = runEngine({ rows: 12, dropColumn, prng });

  return NextResponse.json({ commitHex, combinedSeed: combined, pegMapHash, binIndex, path });
}
