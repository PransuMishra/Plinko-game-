"use client";

import { useState } from "react";
import Controls from "@/components/Controls";
import PlinkoBoard from "@/components/PlinkoBoard";

export default function Home() {
  const [dropColumn, setDropColumn] = useState(6);
  const [bet, setBet] = useState(10);

  const [result, setResult] = useState<any>(null);
  const [path, setPath] = useState<string[]>([]);
  const [binIndex, setBinIndex] = useState<number | null>(null);
  const [rows, setRows] = useState(12);

  async function startRound() {
    try {
      const commitRes = await fetch("/api/rounds/commit", { method: "POST" });
      const commit = await commitRes.json();

      const startRes = await fetch(`/api/rounds/${commit.roundId}/start`, {
        method: "POST",
        body: JSON.stringify({
          clientSeed: "player-seed",
          betCents: bet,
          dropColumn: dropColumn,
        }),
      });

      const start = await startRes.json();

      setPath(start.path);
      setBinIndex(start.binIndex);
      setResult(start);
      setRows(start.rows);
    } catch (e) {
      console.error("Round error:", e);
    }
  }

  return (
    <div className="flex flex-col items-center p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Plinko Game</h1>

      <Controls
        dropColumn={dropColumn}
        setDropColumn={setDropColumn}
        bet={bet}
        setBet={setBet}
        startRound={startRound}
      />

      <PlinkoBoard rows={rows} path={path} />

      {result && (
        <div className="mt-6 p-4 bg-white/10 rounded text-white">
          <p><strong>Bin Index:</strong> {binIndex}</p>
          <p><strong>Payout Multiplier:</strong> x{result.payoutMultiplier}</p>
          <p><strong>PegMapHash:</strong> {result.pegMapHash}</p>
        </div>
      )}
    </div>
  );
}
