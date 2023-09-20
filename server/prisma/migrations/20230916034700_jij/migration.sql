/*
  Warnings:

  - Added the required column `version` to the `FishData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mac` to the `Pool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fishdata` ADD COLUMN `version` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pool` ADD COLUMN `mac` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `verifyCode` VARCHAR(191) NULL;
