-- CreateEnum
CREATE TYPE "Motivation" AS ENUM ('workshops', 'resume', 'improve', 'jobOps', 'meetPeople', 'launchProduct', 'winPrize', 'other');

-- DropIndex
DROP INDEX "Experience_userId_idx";

-- DropIndex
DROP INDEX "Language_experienceId_idx";

-- DropIndex
DROP INDEX "Tool_experienceId_idx";

-- CreateTable
CREATE TABLE "HackerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "website" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "yearsOfExp" INTEGER,
    "motivation" "Motivation"[],
    "builtBefore" TEXT,
    "wantToBuild" TEXT,

    CONSTRAINT "HackerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SponsorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "website" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "yearsOfExp" INTEGER,
    "motivation" "Motivation"[],
    "builtBefore" TEXT,
    "wantToBuild" TEXT,

    CONSTRAINT "SponsorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HackerProfile_userId_key" ON "HackerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SponsorProfile_userId_key" ON "SponsorProfile"("userId");
