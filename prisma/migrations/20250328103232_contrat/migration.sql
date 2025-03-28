/*
  Warnings:

  - You are about to drop the column `documentId` on the `Contrat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contrat" DROP COLUMN "documentId";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "contratId" TEXT;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_contratId_fkey" FOREIGN KEY ("contratId") REFERENCES "Contrat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
