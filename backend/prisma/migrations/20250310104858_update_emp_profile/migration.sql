/*
  Warnings:

  - You are about to drop the column `contactDetails` on the `employer` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `employer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `employer` table. All the data in the column will be lost.
  - Added the required column `companySize` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industryType` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `employer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aboutCompany` on table `employer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `employer` DROP COLUMN `contactDetails`,
    DROP COLUMN `industry`,
    DROP COLUMN `name`,
    ADD COLUMN `companySize` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactName` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `industryType` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `aboutCompany` VARCHAR(191) NOT NULL;
