-- CreateTable
CREATE TABLE "MentorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "website" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "telegram" TEXT,
    "twitter" TEXT,
    "yearsOfExp" INTEGER,
    "ethExp" "EthExp",
    "otherEvents" VARCHAR(500),
    "reasonForMentoring" VARCHAR(500),
    "rules" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MentorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MentorProfile_userId_key" ON "MentorProfile"("userId");

-- AddForeignKey
ALTER TABLE "MentorProfile" ADD CONSTRAINT "MentorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
