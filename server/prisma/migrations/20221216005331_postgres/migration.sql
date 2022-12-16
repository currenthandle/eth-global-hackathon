-- CreateEnum
CREATE TYPE "Role" AS ENUM ('hacker', 'mentor', 'sponsor');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('new', 'beginner', 'intermediate', 'advanced', 'expert');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'hacker',
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "student" BOOLEAN NOT NULL DEFAULT false,
    "school" TEXT,
    "country" TEXT,
    "company" TEXT,
    "website" TEXT,
    "github" TEXT,
    "twitter" TEXT,
    "telegram" TEXT,
    "linkedin" TEXT,
    "jobs" BOOLEAN NOT NULL DEFAULT false,
    "applicationStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" "ExperienceLevel",
    "years" INTEGER,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_userId_key" ON "Experience"("userId");

-- CreateIndex
CREATE INDEX "Experience_userId_idx" ON "Experience"("userId");

-- CreateIndex
CREATE INDEX "Tool_experienceId_idx" ON "Tool"("experienceId");

-- CreateIndex
CREATE INDEX "Language_experienceId_idx" ON "Language"("experienceId");
