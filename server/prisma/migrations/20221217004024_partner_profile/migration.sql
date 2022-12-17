-- CreateTable
CREATE TABLE "PartnerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "website" TEXT,
    "organization" TEXT,
    "linkedin" TEXT,
    "telegram" TEXT,
    "twitter" TEXT,
    "otherEvents" VARCHAR(500),
    "reasonForSupporting" VARCHAR(500),
    "rules" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PartnerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnerProfile_userId_key" ON "PartnerProfile"("userId");

-- AddForeignKey
ALTER TABLE "PartnerProfile" ADD CONSTRAINT "PartnerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
