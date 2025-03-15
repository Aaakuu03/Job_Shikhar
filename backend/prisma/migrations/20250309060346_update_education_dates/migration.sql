/*
  Warnings:

  - You are about to alter the column `startDate` on the `education` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `endDate` on the `education` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `date` on the `training` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `startDate` on the `workexperience` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `endDate` on the `workexperience` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `education` MODIFY `startDate` DATETIME(3) NOT NULL,
    MODIFY `endDate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `training` MODIFY `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `workexperience` MODIFY `startDate` DATETIME(3) NOT NULL,
    MODIFY `endDate` DATETIME(3) NULL;
