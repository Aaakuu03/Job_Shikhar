/*
  Warnings:

  - You are about to drop the `_jobtojob_seeker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_seeker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_jobtojob_seeker` DROP FOREIGN KEY `_JobToJob_Seeker_A_fkey`;

-- DropForeignKey
ALTER TABLE `_jobtojob_seeker` DROP FOREIGN KEY `_JobToJob_Seeker_B_fkey`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_jobSeekerId_fkey`;

-- DropForeignKey
ALTER TABLE `education` DROP FOREIGN KEY `Education_jobSeekerId_fkey`;

-- DropForeignKey
ALTER TABLE `job_seeker` DROP FOREIGN KEY `Job_Seeker_userId_fkey`;

-- DropForeignKey
ALTER TABLE `training` DROP FOREIGN KEY `Training_jobSeekerId_fkey`;

-- DropForeignKey
ALTER TABLE `workexperience` DROP FOREIGN KEY `WorkExperience_jobSeekerId_fkey`;

-- DropTable
DROP TABLE `_jobtojob_seeker`;

-- DropTable
DROP TABLE `job_seeker`;

-- CreateTable
CREATE TABLE `JobSeeker` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NULL,
    `gender` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `salaryExpectation` DECIMAL(10, 2) NULL,
    `preferredJobLocation` VARCHAR(191) NULL,
    `skills` VARCHAR(191) NULL,

    UNIQUE INDEX `JobSeeker_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JobToJobSeeker` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_JobToJobSeeker_AB_unique`(`A`, `B`),
    INDEX `_JobToJobSeeker_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobSeeker` ADD CONSTRAINT `JobSeeker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Education` ADD CONSTRAINT `Education_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkExperience` ADD CONSTRAINT `WorkExperience_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobSeekerId_fkey` FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobToJobSeeker` ADD CONSTRAINT `_JobToJobSeeker_A_fkey` FOREIGN KEY (`A`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobToJobSeeker` ADD CONSTRAINT `_JobToJobSeeker_B_fkey` FOREIGN KEY (`B`) REFERENCES `JobSeeker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
