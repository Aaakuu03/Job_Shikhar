/*
  Warnings:

  - Added the required column `jobLocation` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startDate` on the `workexperience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `endDate` to the `workexperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workexperience` ADD COLUMN `jobLocation` VARCHAR(191) NOT NULL,
    DROP COLUMN `startDate`,
    ADD COLUMN `startDate` INTEGER NOT NULL,
    DROP COLUMN `endDate`,
    ADD COLUMN `endDate` INTEGER NOT NULL;
