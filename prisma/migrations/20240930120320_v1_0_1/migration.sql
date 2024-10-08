/*
  Warnings:

  - You are about to drop the `TournyPoll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VotePoll` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PollType" AS ENUM ('VOTE', 'TOURNY');

-- DropTable
DROP TABLE "TournyPoll";

-- DropTable
DROP TABLE "VotePoll";

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submissions" INTEGER NOT NULL DEFAULT 0,
    "isVideo" BOOLEAN NOT NULL,
    "src" VARCHAR(400),
    "type" "PollType" NOT NULL,
    "additionalField" JSONB NOT NULL,
    "options" JSONB NOT NULL,
    "totalScore" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "genre" "Genre" NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Poll_id_key" ON "Poll"("id");
