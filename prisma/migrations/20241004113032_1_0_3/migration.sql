/*
  Warnings:

  - Made the column `src` on table `Poll` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Poll" ALTER COLUMN "src" SET NOT NULL;
