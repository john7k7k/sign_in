-- CreateTable
CREATE TABLE `FishMap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fish` (
    `version` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `bc` DOUBLE NOT NULL,
    `err` INTEGER NOT NULL,
    `active` INTEGER NOT NULL,

    PRIMARY KEY (`version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fish` ADD CONSTRAINT `Fish_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `FishMap`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
