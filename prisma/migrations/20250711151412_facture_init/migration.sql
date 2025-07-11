-- CreateTable
CREATE TABLE "Facture" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT,
    "acquittee" BOOLEAN DEFAULT false,
    "numeroOrdre" INTEGER,
    "modeReglement" TEXT,
    "devise" TEXT,
    "observation" TEXT,
    "totalHT" DOUBLE PRECISION,
    "remise" DOUBLE PRECISION,
    "totalTTC" DOUBLE PRECISION,
    "totalTVA" DOUBLE PRECISION,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemFacture" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "remise" DOUBLE PRECISION,
    "tva" DOUBLE PRECISION,
    "total" DOUBLE PRECISION NOT NULL,
    "factureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemFacture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemFacture" ADD CONSTRAINT "ItemFacture_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "Facture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
