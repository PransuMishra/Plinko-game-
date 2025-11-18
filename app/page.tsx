// app/page.tsx
"use client";

import React, { useState } from "react";
import Controls from "@/components/Controls";
import PlinkoBoard from "@/components/PlinkoBoard";

export default function Home() {
  const [dropColumn, setDropColumn] = useState(6);
  const [bet, setBet] = useState(10);
  const [result, setResult] = useState<any>(null);
  const [path, setPath] = useState<string[]>([]);

  async function startRound() {
    // 1. create commit
    const commitRes = await fetch("/api/rounds/commit", { method: "POST" });
    const commit = await commitRes.json();

    // 2. start round
    const startRes = await fetch(`/api/rounds/${commit.roundId}/start`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        clientSeed: "player-seed",
        betCents: bet,
        dropColumn,
      }),
    });
    const start = await startRes.json();
    setResult(start);
    setPath(start.path || []);
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6">Plinko Game</h1>
      <Controls dropColumn={dropColumn} setDropColumn={setDropColumn} bet={bet} setBet={setBet} startRound={startRound} />

      <PlinkoBoard rows={12} path={path} />

      {result && (
        <div className="mt-6 p-4 bg-white/80 rounded text-black">
          <p><strong>Bin Index:</strong> {result.binIndex}</p>
          <p><strong>Payout Multiplier:</strong> x{result.payoutMultiplier}</p>
          <p><strong>PegMapHash:</strong> {result.pegMapHash}</p>
        </div>
      )}
    </div>
  );
}
