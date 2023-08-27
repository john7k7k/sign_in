-- DropForeignKey
ALTER TABLE `fishdata` DROP FOREIGN KEY `FishData_fishUID_fkey`;

-- AddForeignKey
ALTER TABLE `FishData` ADD CONSTRAINT `FishData_fishUID_fkey` FOREIGN KEY (`fishUID`) REFERENCES `Fish`(`fishUID`) ON DELETE CASCADE ON UPDATE CASCADE;
