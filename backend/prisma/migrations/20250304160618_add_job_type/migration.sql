/*
  Warnings:

  - You are about to drop the column `salaryExpectation` on the `jobseeker` table. All the data in the column will be lost.
  - Made the column `skills` on table `jobseeker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `jobseeker` DROP COLUMN `salaryExpectation`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `currency` VARCHAR(191) NOT NULL DEFAULT 'NRS',
    ADD COLUMN `expectedSalary` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `jobType` VARCHAR(191) NOT NULL DEFAULT 'Full Time',
    ADD COLUMN `salaryFrequency` VARCHAR(191) NOT NULL DEFAULT 'monthly',
    ADD COLUMN `salaryType` VARCHAR(191) NOT NULL DEFAULT 'above',
    MODIFY `skills` VARCHAR(191) NOT NULL;
