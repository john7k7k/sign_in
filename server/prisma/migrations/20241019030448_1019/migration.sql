-- CreateTable
CREATE TABLE `bin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `version` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `Bin_version_key`(`version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `component` (
    `dataID` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,
    `hours` DOUBLE NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,

    PRIMARY KEY (`dataID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `controller` (
    `id` VARCHAR(191) NOT NULL,
    `fish` VARCHAR(191) NOT NULL,
    `exist` INTEGER NOT NULL,
    `auto` INTEGER NOT NULL,
    `diving` INTEGER NOT NULL,
    `floating` INTEGER NOT NULL,
    `forward` INTEGER NOT NULL,
    `leave_auto` INTEGER NOT NULL,
    `led` INTEGER NOT NULL,
    `left` INTEGER NOT NULL,
    `middle` INTEGER NOT NULL,
    `right` INTEGER NOT NULL,
    `switch_mode` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '新遙控器',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `depart` (
    `id` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    INDEX `Depart_location_fkey`(`location`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fish` (
    `fishUID` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `exist` INTEGER NOT NULL,
    `version` VARCHAR(191) NOT NULL DEFAULT '',
    `photoCode` INTEGER NOT NULL DEFAULT 0,

    INDEX `Fish_location_fkey`(`location`),
    PRIMARY KEY (`fishUID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fishable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `fishUID` VARCHAR(191) NOT NULL,

    INDEX `FishAble_fishUID_fkey`(`fishUID`),
    UNIQUE INDEX `FishAble_userID_fishUID_key`(`userID`, `fishUID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fishdata` (
    `dataID` INTEGER NOT NULL AUTO_INCREMENT,
    `fishUID` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,
    `bc` DOUBLE NOT NULL,
    `err` INTEGER NOT NULL,
    `active` INTEGER NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `accumulationTime` INTEGER NOT NULL DEFAULT 0,

    INDEX `FishData_fishUID_fkey`(`fishUID`),
    PRIMARY KEY (`dataID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instruction` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pool` (
    `id` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mac` VARCHAR(191) NOT NULL,

    INDEX `Pool_location_fkey`(`location`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passcode` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `registrationTime` INTEGER NOT NULL,
    `exist` INTEGER NOT NULL,
    `verify` INTEGER NOT NULL,
    `verifyCode` VARCHAR(191) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
