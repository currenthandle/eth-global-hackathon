/*
  Warnings:

  - The values [new,advanced] on the enum `ExperienceLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExperienceLevel_new" AS ENUM ('beginner', 'intermediate', 'expert');
ALTER TYPE "ExperienceLevel" RENAME TO "ExperienceLevel_old";
ALTER TYPE "ExperienceLevel_new" RENAME TO "ExperienceLevel";
DROP TYPE "ExperienceLevel_old";
COMMIT;
