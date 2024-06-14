/*
  Warnings:

  - Added the required column `deleted` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "deleted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted" BOOLEAN NOT NULL;
