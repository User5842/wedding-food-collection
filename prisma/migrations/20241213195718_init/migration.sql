-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "allergies" VARCHAR(255),
    "child" BOOLEAN NOT NULL DEFAULT false,
    "familyId" INTEGER NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "foodSelection" VARCHAR(255) NOT NULL,
    "lastBName" VARCHAR(255) NOT NULL,
    "memberId" INTEGER NOT NULL,
    "needsHighChair" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "familyId" SERIAL NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);
