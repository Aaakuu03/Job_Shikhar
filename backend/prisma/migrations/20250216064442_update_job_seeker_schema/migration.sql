/*
  Warnings:

  - You are about to drop the `education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobpreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workexperience` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `education` DROP FOREIGN KEY `Education_jobSeekerId_fkey`;

-- DropForeignKey
ALTER TABLE `jobpreference` DROP FOREIGN KEY `JobPreference_jobSeekerId_fkey`;

-- DropForeignKey
ALTER TABLE `training` DROP FOREIGN KEY `Training_jobSeekerId_fkey`;

-- DropForeignKey
ALTER TABLE `workexperience` DROP FOREIGN KEY `WorkExperience_jobSeekerId_fkey`;

-- AlterTable
ALTER TABLE `job_seeker` ADD COLUMN `degree` VARCHAR(191) NULL,
    ADD COLUMN `educationStatus` VARCHAR(191) NULL,
    ADD COLUMN `preferredJobLocation` VARCHAR(191) NULL,
    ADD COLUMN `salaryExpectation` DECIMAL(10, 2) NULL,
    ADD COLUMN `skills` VARCHAR(191) NULL,
    ADD COLUMN `university` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `education`;

-- DropTable
DROP TABLE `jobpreference`;

-- DropTable
DROP TABLE `training`;

-- DropTable
DROP TABLE `workexperience`;

-- CreateTable
CREATE TABLE `Token` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Token_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
