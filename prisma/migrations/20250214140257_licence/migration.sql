-- CreateTable
CREATE TABLE "Base" (
    "id" TEXT NOT NULL,
    "societe" TEXT NOT NULL,
    "chemin" TEXT NOT NULL,
    "convention" TEXT NOT NULL,
    "poste" INTEGER NOT NULL,
    "employe" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comentaire" TEXT,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logiciel" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "versionInterne" TEXT NOT NULL,
    "societe" BOOLEAN NOT NULL,
    "poste" INTEGER NOT NULL,
    "employe" INTEGER NOT NULL,
    "clientServeur" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "dateAchat" TIMESTAMP(3) NOT NULL,
    "dossier" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logiciel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Base" ADD CONSTRAINT "Base_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logiciel" ADD CONSTRAINT "Logiciel_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
