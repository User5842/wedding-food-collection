/*
  Warnings:

  - You are about to drop the `Family` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_familyId_fkey";

-- DropTable
DROP TABLE "Family";

-- DropTable
DROP TABLE "Guest";
