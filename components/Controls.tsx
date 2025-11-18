// components/Controls.tsx
"use client";
import React from "react";

export default function Controls({ dropColumn, setDropColumn, bet, setBet, startRound }: any) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="number"
        value={dropColumn}
        onChange={(e) => setDropColumn(Number(e.target.value))}
        className="border px-4 py-2"
        min={0}
        max={12}
      />
      <input
        type="number"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        className="border px-4 py-2"
      />
      <button onClick={startRound} className="bg-blue-600 text-white px-6 py-2 rounded">
        Drop Ball
      </button>
    </div>
  );
}
