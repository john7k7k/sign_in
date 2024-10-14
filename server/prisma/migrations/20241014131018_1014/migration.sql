-- AlterTable
ALTER TABLE `bin` ADD COLUMN `message` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Component` (
    `dataID` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,
    `hours` DOUBLE NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,

    PRIMARY KEY (`dataID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
