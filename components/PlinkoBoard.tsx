// components/PlinkoBoard.tsx
"use client";
import React, { useEffect, useState } from "react";
import Ball from "./Ball";

export default function PlinkoBoard({ rows = 12, path = [] }: { rows?: number; path?: string[] }) {
  // simple board center offset math for display
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  useEffect(() => {
    setCurrentPath(path || []);
  }, [path]);

  // compute ball position: we let Ball component animate based on path
  return (
    <div className="relative flex flex-col items-center mt-10" style={{ width: 720 }}>
      {/* pegs */}
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        {[...Array(rows)].map((_, r) => (
          <div key={r} style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: r === 0 ? 0 : 8 }}>
            {[...Array(r + 1)].map((__, i) => (
              <div key={i} style={{ width: 10, height: 10, background: "#dde1e6", borderRadius: 999 }} />
            ))}
          </div>
        ))}
      </div>

      {/* ball animation */}
      <div style={{ position: "relative", height: 320, width: "100%", marginTop: -rows * 6 }}>
        <Ball path={currentPath} />
      </div>

      {/* bins */}
      <div className="flex gap-6 mt-6">
        {[...Array(rows + 1)].map((_, i) => (
          <div key={i} className="w-8 h-10 bg-gray-500 rounded-md" />
        ))}
      </div>
    </div>
  );
}
