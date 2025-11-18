// components/Ball.tsx
"use client";
import React, { useEffect, useState } from "react";

export default function Ball({ path = [] }: { path?: string[] }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!path || path.length === 0) {
      setStep(0);
      return;
    }
    setStep(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStep(i);
      if (i >= path.length) {
        clearInterval(interval);
      }
    }, 220);
    return () => clearInterval(interval);
  }, [path]);

  // compute horizontal index from path steps taken
  let x = 0;
  for (let j = 0; j < Math.min(step, path.length); j++) {
    if (path[j] === "R") x += 1;
  }

  // row-based vertical offset (approx)
  const top = (Math.min(step, path.length)) * 26;
  const left = x * 28 + 320 - 12; // center-ish offset (tweak to align)

  return (
    <div style={{ position: "absolute", top: top, left: left, transition: "all 220ms linear" }}>
      <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ef4444" }} />
    </div>
  );
}
