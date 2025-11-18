/*
  Warnings:

  - You are about to alter the column `pathJson` on the `Round` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "serverSeed" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "commitHex" TEXT NOT NULL,
    "rows" INTEGER NOT NULL,
    "clientSeed" TEXT,
    "combinedSeed" TEXT,
    "pegMapHash" TEXT,
    "dropColumn" INTEGER,
    "binIndex" INTEGER,
    "payoutMultiplier" REAL,
    "betCents" INTEGER,
    "pathJson" JSONB,
    "revealedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Round" ("betCents", "binIndex", "clientSeed", "combinedSeed", "commitHex", "createdAt", "dropColumn", "id", "nonce", "pathJson", "payoutMultiplier", "pegMapHash", "revealedAt", "rows", "serverSeed", "status") SELECT "betCents", "binIndex", "clientSeed", "combinedSeed", "commitHex", "createdAt", "dropColumn", "id", "nonce", "pathJson", "payoutMultiplier", "pegMapHash", "revealedAt", "rows", "serverSeed", "status" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
