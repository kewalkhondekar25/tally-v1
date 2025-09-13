/*
  Warnings:

  - Added the required column `notionDbName` to the `NotionDb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotionDb" ADD COLUMN     "notionDbName" TEXT NOT NULL;
