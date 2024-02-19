/*
  Warnings:

  - You are about to drop the `controllerenable` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `auto` to the `Controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diving` to the `Controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floating` to the `Controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forward` to the `Controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leave_auto` to the `Controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `led` to the `Controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `left` to the `Controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle` to the `Controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `right` to the `Controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `switch_mode` to the `Controller` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `controllerenable` DROP FOREIGN KEY `ControllerEnable_controllerID_fkey`;

-- AlterTable
ALTER TABLE `controller` ADD COLUMN `auto` INTEGER NOT NULL,
    ADD COLUMN `diving` INTEGER NOT NULL,
    ADD COLUMN `floating` INTEGER NOT NULL,
    ADD COLUMN `forward` INTEGER NOT NULL,
    ADD COLUMN `leave_auto` INTEGER NOT NULL,
    ADD COLUMN `led` INTEGER NOT NULL,
    ADD COLUMN `left` INTEGER NOT NULL,
    ADD COLUMN `middle` INTEGER NOT NULL,
    ADD COLUMN `right` INTEGER NOT NULL,
    ADD COLUMN `switch_mode` INTEGER NOT NULL;

-- DropTable
DROP TABLE `controllerenable`;
