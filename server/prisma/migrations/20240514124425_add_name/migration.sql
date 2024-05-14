/*
  Warnings:

  - Added the required column `name` to the `user_organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_organizations" ADD COLUMN     "name" TEXT NOT NULL;
