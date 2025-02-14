/*
  Warnings:

  - You are about to drop the column `comentaire` on the `Base` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Base" DROP COLUMN "comentaire",
ADD COLUMN     "commentaire" TEXT;
