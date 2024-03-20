/*
  Warnings:

  - Added the required column `errReason` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `component` ADD COLUMN `errReason` VARCHAR(191) NOT NULL,
    ADD COLUMN `hours` DOUBLE NOT NULL,
    ADD COLUMN `local` VARCHAR(191) NOT NULL,
    ADD COLUMN `time` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Motor` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,
    `hours` DOUBLE NOT NULL,
    `errReason` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,
    `turn` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
