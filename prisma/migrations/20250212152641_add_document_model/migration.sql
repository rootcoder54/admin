/*
  Warnings:

  - You are about to drop the column `fichier` on the `Contrat` table. All the data in the column will be lost.
  - You are about to drop the column `fichier` on the `Intervention` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contrat" DROP COLUMN "fichier",
ADD COLUMN     "documentId" TEXT;

-- AlterTable
ALTER TABLE "Intervention" DROP COLUMN "fichier",
ADD COLUMN     "documentId" TEXT;

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "fichier" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
