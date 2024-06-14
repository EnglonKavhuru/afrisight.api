/*
  Warnings:

  - You are about to drop the column `name` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tittle` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'INPROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_userId_fkey";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "symbol",
DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNING',
ADD COLUMN     "tittle" TEXT NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deleted" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
