/*
  Warnings:

  - You are about to drop the column `filename` on the `bin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[version]` on the table `Bin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `time` to the `Bin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bin` DROP COLUMN `filename`,
    ADD COLUMN `time` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bin_version_key` ON `Bin`(`version`);
