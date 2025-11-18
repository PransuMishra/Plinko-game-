/*
  Warnings:

  - You are about to drop the column `revealedAt` on the `Round` table. All the data in the column will be lost.
  - Made the column `serverSeed` on table `Round` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "serverSeed" TEXT NOT NULL,
    "clientSeed" TEXT,
    "combinedSeed" TEXT,
    "nonce" TEXT NOT NULL,
    "commitHex" TEXT NOT NULL,
    "pegMapHash" TEXT,
    "dropColumn" INTEGER,
    "binIndex" INTEGER,
    "rows" INTEGER NOT NULL,
    "betCents" INTEGER,
    "payoutMultiplier" REAL,
    "pathJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Round" ("betCents", "binIndex", "clientSeed", "combinedSeed", "commitHex", "createdAt", "dropColumn", "id", "nonce", "pathJson", "payoutMultiplier", "pegMapHash", "rows", "serverSeed", "status") SELECT "betCents", "binIndex", "clientSeed", "combinedSeed", "commitHex", "createdAt", "dropColumn", "id", "nonce", "pathJson", "payoutMultiplier", "pegMapHash", "rows", "serverSeed", "status" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
