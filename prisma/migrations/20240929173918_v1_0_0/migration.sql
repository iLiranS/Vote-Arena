-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ANIMALS', 'ANIME', 'ART', 'BOOKS', 'FOOD', 'GAMING', 'TV', 'SPORT', 'MUSIC', 'NATURE', 'TECH', 'TRAVEL', 'STYLE', 'OTHER');

-- CreateTable
CREATE TABLE "VotePoll" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submissions" INTEGER NOT NULL DEFAULT 0,
    "isVideo" BOOLEAN NOT NULL,
    "src" VARCHAR(400),
    "topAmount" INTEGER NOT NULL,
    "options" JSONB NOT NULL,
    "totalScore" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "genre" "Genre" NOT NULL,

    CONSTRAINT "VotePoll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournyPoll" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submissions" INTEGER NOT NULL DEFAULT 0,
    "isVideo" BOOLEAN NOT NULL,
    "src" VARCHAR(400),
    "isRandom" BOOLEAN NOT NULL,
    "options" JSONB NOT NULL,
    "totalScore" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "genre" "Genre" NOT NULL,

    CONSTRAINT "TournyPoll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VotePoll_id_key" ON "VotePoll"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TournyPoll_id_key" ON "TournyPoll"("id");
