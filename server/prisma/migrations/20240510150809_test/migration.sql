/*
  Warnings:

  - You are about to drop the column `abc` on the `component` table. All the data in the column will be lost.
  - You are about to drop the column `abc` on the `motor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `component` DROP COLUMN `abc`;

-- AlterTable
ALTER TABLE `motor` DROP COLUMN `abc`;
