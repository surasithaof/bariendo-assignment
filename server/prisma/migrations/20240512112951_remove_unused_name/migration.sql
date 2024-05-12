/*
  Warnings:

  - You are about to drop the column `name` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `patients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "name";
