// lib/fairness.ts
import crypto from "crypto";

export function generateCommit(serverSeed: string, nonce: string) {
  return crypto.createHash("sha256").update(`${serverSeed}:${nonce}`).digest("hex");
}

export function generateCombined(serverSeed: string, clientSeed: string, nonce: string) {
  return crypto.createHash("sha256").update(`${serverSeed}:${clientSeed}:${nonce}`).digest("hex");
}
