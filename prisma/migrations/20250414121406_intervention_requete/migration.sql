-- AlterTable
ALTER TABLE "Intervention" ADD COLUMN     "requeteId" TEXT;

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_requeteId_fkey" FOREIGN KEY ("requeteId") REFERENCES "Requete"("id") ON DELETE CASCADE ON UPDATE CASCADE;
