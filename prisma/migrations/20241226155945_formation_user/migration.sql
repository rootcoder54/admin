-- CreateTable
CREATE TABLE "UserFormation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT,
    "email" TEXT NOT NULL,
    "profession" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFormation_email_key" ON "UserFormation"("email");
