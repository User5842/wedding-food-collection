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
