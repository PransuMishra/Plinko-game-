// app/api/rounds/commit/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const serverSeed = crypto.randomBytes(32).toString("hex");
    const nonce = crypto.randomBytes(4).toString("hex");
    const commitHex = crypto.createHash("sha256").update(`${serverSeed}:${nonce}`).digest("hex");

    const round = await prisma.round.create({
      data: {
        status: "CREATED",
        serverSeed,
        nonce,
        commitHex,
        rows: 12,
      },
    });

    return NextResponse.json({ roundId: round.id, commitHex, nonce });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
