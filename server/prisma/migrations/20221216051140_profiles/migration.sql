/*
  Warnings:

  - You are about to drop the column `builtBefore` on the `HackerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `HackerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `HackerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `motivation` on the `HackerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `wantToBuild` on the `HackerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `SponsorProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "HackerProfile" DROP COLUMN "builtBefore",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "motivation",
DROP COLUMN "wantToBuild";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "applicationStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- DropTable
DROP TABLE "SponsorProfile";

-- DropEnum
DROP TYPE "Motivation";

-- CreateIndex
CREATE INDEX "Experience_userId_idx" ON "Experience"("userId");

-- CreateIndex
CREATE INDEX "Language_experienceId_idx" ON "Language"("experienceId");

-- CreateIndex
CREATE INDEX "Tool_experienceId_idx" ON "Tool"("experienceId");
