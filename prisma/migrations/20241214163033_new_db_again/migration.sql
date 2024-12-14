-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "allergies" TEXT,
    "child" BOOLEAN NOT NULL DEFAULT false,
    "familyId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "foodSelection" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "needsHighChair" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "familyName" TEXT NOT NULL,
    "responseRecorded" BOOLEAN NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
