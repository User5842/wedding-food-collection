/*
  Warnings:

  - You are about to drop the column `lastBName` on the `Guest` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "lastBName",
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL;
