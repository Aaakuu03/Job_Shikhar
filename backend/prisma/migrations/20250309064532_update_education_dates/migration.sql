/*
  Warnings:

  - You are about to drop the column `date` on the `training` table. All the data in the column will be lost.
  - Added the required column `year` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `training` DROP COLUMN `date`,
    ADD COLUMN `year` INTEGER NOT NULL;
