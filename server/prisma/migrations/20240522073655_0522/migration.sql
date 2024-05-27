/*
  Warnings:

  - You are about to drop the column `errReason` on the `component` table. All the data in the column will be lost.
  - Added the required column `state` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `component` DROP COLUMN `errReason`,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;
