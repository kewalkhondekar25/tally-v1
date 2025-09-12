/*
  Warnings:

  - Added the required column `spreadSheetUrl` to the `SpreadSheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpreadSheets" ADD COLUMN     "spreadSheetUrl" TEXT NOT NULL;
