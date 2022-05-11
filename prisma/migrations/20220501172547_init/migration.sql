/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[password_hash]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_password_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `password`,
    ADD COLUMN `password_hash` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_password_hash_key` ON `User`(`password_hash`);
