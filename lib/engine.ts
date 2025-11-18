// lib/engine.ts
import crypto from "crypto";

export function generatePegMap(rows: number, prng: ReturnType<typeof import("./rng").createPRNG>) {
  const pegMap: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let i = 0; i < r + 1; i++) {
      const leftBias = 0.5 + (prng.rand() - 0.5) * 0.2;
      row.push(Number(leftBias.toFixed(6)));
    }
    pegMap.push(row);
  }
  return pegMap;
}

export function computePath(rows: number, pegMap: number[][], dropColumn: number, prng: ReturnType<typeof import("./rng").createPRNG>) {
  let pos = 0;
  const center = Math.floor(rows / 2);
  const adj = (dropColumn - center) * 0.01;

  const path: ("L" | "R")[] = [];
  for (let r = 0; r < rows; r++) {
    const pegIndex = Math.min(pos, r);
    const base = pegMap[r][pegIndex];
    let bias = base + adj;
    bias = Math.max(0, Math.min(1, bias));
    const rnd = prng.rand();
    if (rnd < bias) {
      path.push("L");
    } else {
      path.push("R");
      pos++;
    }
  }
  return { path, binIndex: pos };
}

export function runEngine(opts: { rows: number; dropColumn: number; prng: ReturnType<typeof import("./rng").createPRNG> }) {
  const { rows, dropColumn, prng } = opts;
  const pegMap = generatePegMap(rows, prng);
  const pegMapHash = crypto.createHash("sha256").update(JSON.stringify(pegMap)).digest("hex");
  const { path, binIndex } = computePath(rows, pegMap, dropColumn, prng);
  return { pegMap, pegMapHash, path, binIndex };
}
