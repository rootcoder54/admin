-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
