/*
  Warnings:

  - The primary key for the `component` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `component` table. All the data in the column will be lost.
  - Added the required column `dataID` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `component` DROP PRIMARY KEY,
    DROP COLUMN `name`,
    ADD COLUMN `dataID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`dataID`);
