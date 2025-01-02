/*
  Warnings:

  - You are about to drop the column `imageFullUrl` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `imageLinkHTML` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `imageThumbUrl` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `imageUserName` on the `Board` table. All the data in the column will be lost.
  - Added the required column `image` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Board" ("createdAt", "id", "title", "updatedAt", "userId") SELECT "createdAt", "id", "title", "updatedAt", "userId" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
