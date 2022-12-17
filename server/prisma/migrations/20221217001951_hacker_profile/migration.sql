/*
  Warnings:

  - The values [partner] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `PartnerProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('hacker', 'mentor', 'sponsor');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'hacker';
COMMIT;

-- DropForeignKey
ALTER TABLE "PartnerProfile" DROP CONSTRAINT "PartnerProfile_userId_fkey";

-- DropTable
DROP TABLE "PartnerProfile";
