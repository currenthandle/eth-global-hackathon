/*
  Warnings:

  - The `applicationStatus` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Accepted', 'Rejected', 'Pending');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "applicationStatus",
ADD COLUMN     "applicationStatus" "ApplicationStatus" NOT NULL DEFAULT 'Pending';
