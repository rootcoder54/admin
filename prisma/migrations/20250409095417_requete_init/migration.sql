-- CreateTable
CREATE TABLE "Requete" (
    "id" TEXT NOT NULL,
    "sujet" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "reponse" TEXT,
    "observation" TEXT,
    "demandeur" TEXT,
    "technicien" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3),
    "etat" BOOLEAN NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Requete_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Requete" ADD CONSTRAINT "Requete_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
