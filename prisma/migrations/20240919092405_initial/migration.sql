-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin', 'VIP');

-- CreateTable
CREATE TABLE "Award" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "src" TEXT NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "participations" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(75) NOT NULL,
    "src" VARCHAR(400) NOT NULL,
    "pollId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPrivate" BOOLEAN NOT NULL,
    "participants" INTEGER NOT NULL,
    "isVideo" BOOLEAN NOT NULL,
    "results" INTEGER[],
    "pollResultId" INTEGER NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserAwards" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Award_title_key" ON "Award"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_UserAwards_AB_unique" ON "_UserAwards"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAwards_B_index" ON "_UserAwards"("B");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAwards" ADD CONSTRAINT "_UserAwards_A_fkey" FOREIGN KEY ("A") REFERENCES "Award"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAwards" ADD CONSTRAINT "_UserAwards_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
