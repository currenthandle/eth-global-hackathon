-- CreateEnum
CREATE TYPE "Motivation" AS ENUM ('workshop', 'resume', 'improve', 'jobOps', 'meetPpl', 'launchProduct', 'winPrize', 'other');

-- CreateEnum
CREATE TYPE "EthExp" AS ENUM ('beginner', 'intermediate', 'expert');

-- AlterTable
ALTER TABLE "HackerProfile" ADD COLUMN     "builtBefore" VARCHAR(500),
ADD COLUMN     "ethExp" "EthExp",
ADD COLUMN     "lookingToBuild" VARCHAR(500),
ADD COLUMN     "motivation" "Motivation"[],
ADD COLUMN     "rules" BOOLEAN NOT NULL DEFAULT false;
