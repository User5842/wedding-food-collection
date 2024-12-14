-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "allergies" VARCHAR(255),
    "child" BOOLEAN NOT NULL DEFAULT false,
    "familyId" INTEGER NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "foodSelection" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "guestId" INTEGER NOT NULL,
    "needsHighChair" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestResponse" (
    "id" SERIAL NOT NULL,
    "allergies" VARCHAR(255),
    "familyId" INTEGER NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "foodSelection" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "guestId" INTEGER NOT NULL,
    "needsHighChair" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GuestResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "familyId" SERIAL NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);
