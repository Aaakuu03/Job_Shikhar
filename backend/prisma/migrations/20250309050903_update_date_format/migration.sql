-- AlterTable
ALTER TABLE `education` MODIFY `startDate` VARCHAR(191) NOT NULL,
    MODIFY `endDate` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `training` MODIFY `date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `workexperience` MODIFY `startDate` VARCHAR(191) NOT NULL,
    MODIFY `endDate` VARCHAR(191) NULL;
