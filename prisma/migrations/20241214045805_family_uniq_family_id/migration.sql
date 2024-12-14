-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "familyId" INTEGER NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,
    "responseRecorded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Family_familyId_key" ON "Family"("familyId");
