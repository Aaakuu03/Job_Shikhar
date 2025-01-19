/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `resetPasswordToken` VARCHAR(191) NULL,
    ADD COLUMN `resetPasswordTokenExpiry` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `verificationToken` VARCHAR(191) NULL;
