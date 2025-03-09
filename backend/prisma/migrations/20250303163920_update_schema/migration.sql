/*
  Warnings:

  - You are about to drop the column `aboutYourself` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to drop the column `degree` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to drop the column `educationStatus` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `job_seeker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `job_seeker` DROP COLUMN `aboutYourself`,
    DROP COLUMN `degree`,
    DROP COLUMN `educationStatus`,
    DROP COLUMN `name`,
    DROP COLUMN `university`;

-- CreateTable
CREATE TABLE `Education` (
    `id` VARCHAR(191) NOT NULL,
    `jobSeekerId` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `courseProgram` VARCHAR(191) NULL,
    `board` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Training` (
    `id` VARCHAR(191) NOT NULL,
    `jobSeekerId` VARCHAR(191) NOT NULL,
    `trainingName` VARCHAR(191) NOT NULL,
    `institute` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkExperience` (
    `id` VARCHAR(191) NOT NULL,
    `jobSeekerId` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Education` ADD CONSTRAINT `Education_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `Job_Seeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `Job_Seeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkExperience` ADD CONSTRAINT `WorkExperience_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `Job_Seeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
