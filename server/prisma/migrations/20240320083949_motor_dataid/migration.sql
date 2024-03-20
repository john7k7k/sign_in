/*
  Warnings:

  - The primary key for the `motor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `dataID` to the `Motor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `motor` DROP PRIMARY KEY,
    ADD COLUMN `dataID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`dataID`);
