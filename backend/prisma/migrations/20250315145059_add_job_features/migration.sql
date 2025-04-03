/*
  Warnings:

  - Made the column `aboutCompany` on table `employer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `employer` MODIFY `aboutCompany` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PricingPackage` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `jobLimit` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,

    UNIQUE INDEX `PricingPackage_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployerPackage` (
    `id` VARCHAR(191) NOT NULL,
    `employerId` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `jobCount` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `EmployerPackage_employerId_key`(`employerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmployerPackage` ADD CONSTRAINT `EmployerPackage_employerId_fkey` FOREIGN KEY (`employerId`) REFERENCES `Employer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployerPackage` ADD CONSTRAINT `EmployerPackage_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `PricingPackage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
