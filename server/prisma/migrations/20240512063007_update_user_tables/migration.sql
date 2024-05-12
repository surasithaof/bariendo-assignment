/*
  Warnings:

  - You are about to drop the column `user_id` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `organization_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_organization_id]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_organization_id]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_organization_id` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_organization_id` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_user_id_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organization_id_fkey";

-- DropIndex
DROP INDEX "doctors_user_id_key";

-- DropIndex
DROP INDEX "patients_user_id_key";

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "user_id",
ADD COLUMN     "user_organization_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "user_id",
ADD COLUMN     "user_organization_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "organization_id",
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "user_organizations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Patient',

    CONSTRAINT "user_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_user_organization_id_key" ON "doctors"("user_organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_user_organization_id_key" ON "patients"("user_organization_id");

-- AddForeignKey
ALTER TABLE "user_organizations" ADD CONSTRAINT "user_organizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_organizations" ADD CONSTRAINT "user_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_organization_id_fkey" FOREIGN KEY ("user_organization_id") REFERENCES "user_organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_organization_id_fkey" FOREIGN KEY ("user_organization_id") REFERENCES "user_organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
