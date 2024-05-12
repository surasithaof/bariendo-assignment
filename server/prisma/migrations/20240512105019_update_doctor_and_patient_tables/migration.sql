/*
  Warnings:

  - You are about to drop the column `organization_id` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `organization_id` on the `patients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_organization_id_fkey";

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "organization_id";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "organization_id";
