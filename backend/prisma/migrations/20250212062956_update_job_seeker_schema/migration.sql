/*
  Warnings:

  - You are about to drop the column `degree` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to drop the column `educationStatus` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to drop the column `preferredJobLocation` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to drop the column `salary_range` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `job_seeker` table. All the data in the column will be lost.
  - You are about to alter the column `dob` on the `job_seeker` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `job_seeker` DROP COLUMN `degree`,
    DROP COLUMN `educationStatus`,
    DROP COLUMN `preferredJobLocation`,
    DROP COLUMN `salary_range`,
    DROP COLUMN `skills`,
    DROP COLUMN `university`,
    MODIFY `dob` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `JobPreference` (
    `id` VARCHAR(191) NOT NULL,
    `jobSeekerId` VARCHAR(191) NOT NULL,
    `jobTitle` VARCHAR(191) NOT NULL,
    `salaryExpectation` DECIMAL(10, 2) NULL,
    `preferredJobLocation` VARCHAR(191) NULL,
    `skills` VARCHAR(191) NULL,

    UNIQUE INDEX `JobPreference_jobSeekerId_key`(`jobSeekerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Education` (
    `id` VARCHAR(191) NOT NULL,
    `jobSeekerId` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,
    `startYear` INTEGER NOT NULL,
    `endYear` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Training` (
    `id` VARCHAR(191) NOT NULL,
    `jobSeekerId` VARCHAR(191) NOT NULL,
    `trainingName` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `completionYear` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkExperience` (
    `id` VARCHAR(191) NOT NULL,
    `jobSeekerId` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobPreference` ADD CONSTRAINT `JobPreference_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `Job_Seeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Education` ADD CONSTRAINT `Education_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `Job_Seeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `Job_Seeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkExperience` ADD CONSTRAINT `WorkExperience_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `Job_Seeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
