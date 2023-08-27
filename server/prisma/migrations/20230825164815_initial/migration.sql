-- CreateTable
CREATE TABLE `User` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passcode` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `registrationTime` INTEGER NOT NULL,
    `exist` INTEGER NOT NULL,
    `verify` INTEGER NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fish` (
    `fishUID` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `exist` INTEGER NOT NULL,

    PRIMARY KEY (`fishUID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FishAble` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `fishUID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FishAble_userID_fishUID_key`(`userID`, `fishUID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FishData` (
    `dataID` INTEGER NOT NULL AUTO_INCREMENT,
    `fishUID` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,
    `bc` DOUBLE NOT NULL,
    `err` INTEGER NOT NULL,
    `active` INTEGER NOT NULL,

    PRIMARY KEY (`dataID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pool` (
    `id` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Depart` (
    `id` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instruction` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fish` ADD CONSTRAINT `Fish_location_fkey` FOREIGN KEY (`location`) REFERENCES `Pool`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FishAble` ADD CONSTRAINT `FishAble_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FishAble` ADD CONSTRAINT `FishAble_fishUID_fkey` FOREIGN KEY (`fishUID`) REFERENCES `Fish`(`fishUID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FishData` ADD CONSTRAINT `FishData_fishUID_fkey` FOREIGN KEY (`fishUID`) REFERENCES `Fish`(`fishUID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pool` ADD CONSTRAINT `Pool_location_fkey` FOREIGN KEY (`location`) REFERENCES `Depart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Depart` ADD CONSTRAINT `Depart_location_fkey` FOREIGN KEY (`location`) REFERENCES `Instruction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
