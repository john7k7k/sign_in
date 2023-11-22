-- CreateTable
CREATE TABLE `Controller` (
    `id` VARCHAR(191) NOT NULL,
    `fish` VARCHAR(191) NOT NULL,
    `exist` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ControllerEnable` (
    `controllerID` VARCHAR(191) NOT NULL,
    `forward` INTEGER NOT NULL,
    `left` INTEGER NOT NULL,
    `right` INTEGER NOT NULL,
    `floating` INTEGER NOT NULL,
    `diving` INTEGER NOT NULL,
    `middle` INTEGER NOT NULL,
    `switch_mode` INTEGER NOT NULL,
    `led` INTEGER NOT NULL,
    `auto` INTEGER NOT NULL,
    `leave_auto` INTEGER NOT NULL,

    PRIMARY KEY (`controllerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ControllerEnable` ADD CONSTRAINT `ControllerEnable_controllerID_fkey` FOREIGN KEY (`controllerID`) REFERENCES `Controller`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
