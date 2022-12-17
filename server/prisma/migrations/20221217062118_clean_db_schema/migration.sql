/*
  Warnings:

  - You are about to drop the column `linkedin` on the `HackerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `rules` on the `HackerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `HackerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `MentorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `rules` on the `MentorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `MentorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `PartnerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `rules` on the `PartnerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `PartnerProfile` table. All the data in the column will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_experienceId_fkey";

-- AlterTable
ALTER TABLE "HackerProfile" DROP COLUMN "linkedin",
DROP COLUMN "rules",
DROP COLUMN "website";

-- AlterTable
ALTER TABLE "MentorProfile" DROP COLUMN "linkedin",
DROP COLUMN "rules",
DROP COLUMN "website";

-- AlterTable
ALTER TABLE "PartnerProfile" DROP COLUMN "linkedin",
DROP COLUMN "rules",
DROP COLUMN "website";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "rules" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "website" TEXT;

-- DropTable
DROP TABLE "Experience";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "Tool";
