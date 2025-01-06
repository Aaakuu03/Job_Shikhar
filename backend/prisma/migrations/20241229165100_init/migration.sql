/*
  Warnings:

  - You are about to alter the column `userType` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `userType` ENUM('JOBSEEKER', 'EMPLOYER') NOT NULL DEFAULT 'JOBSEEKER';
