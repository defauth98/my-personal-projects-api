-- AlterTable
ALTER TABLE `project` ADD COLUMN `deleted` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `api_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
