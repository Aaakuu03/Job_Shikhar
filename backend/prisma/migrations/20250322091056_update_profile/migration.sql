/*
  Warnings:

  - You are about to alter the column `industryType` on the `employer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `employer` MODIFY `industryType` ENUM('TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'MARKETING', 'RETAIL', 'MANUFACTURING', 'REAL_ESTATE', 'ENTERTAINMENT', 'FOOD_MARKET') NOT NULL;
