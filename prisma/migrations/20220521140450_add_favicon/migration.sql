/*
  Warnings:

  - Added the required column `faviconLink` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `faviconLink` VARCHAR(191) NOT NULL;
