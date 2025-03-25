/*
  Warnings:

  - Made the column `dateCloture` on table `Intervention` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Intervention" ALTER COLUMN "dateCloture" SET NOT NULL;
