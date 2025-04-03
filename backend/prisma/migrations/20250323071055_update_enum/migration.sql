/*
  Warnings:

  - The values [TECHNOLOGY,FINANCE,MARKETING,RETAIL,REAL_ESTATE,ENTERTAINMENT,FOOD_MARKET] on the enum `Employer_industryType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `job` table. All the data in the column will be lost.
  - You are about to alter the column `category` on the `job` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `jobType` on the `job` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - Added the required column `jobLocation` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employer` MODIFY `industryType` ENUM('IT_SOFTWARE', 'FINANCE_BANKING', 'HEALTHCARE', 'EDUCATION', 'MANUFACTURING', 'RETAIL_ECOMMERCE', 'HOSPITALITY_TOURISM', 'FOOD_BEVERAGE', 'CONSTRUCTION_ENGINEERING') NOT NULL;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `type`,
    ADD COLUMN `jobLocation` VARCHAR(191) NOT NULL,
    MODIFY `category` ENUM('SOFTWARE_DEVELOPMENT', 'DATA_SCIENCE_AI', 'NETWORKING_CYBERSECURITY', 'ACCOUNTING_FINANCE', 'SALES_MARKETING', 'HEALTHCARE_MEDICAL', 'TEACHING_EDUCATION', 'MECHANICAL_ENGINEERING', 'CUSTOMER_SUPPORT', 'GRAPHIC_DESIGN_MULTIMEDIA', 'HUMAN_RESOURCES', 'TRANSPORT_LOGISTICS') NOT NULL,
    MODIFY `jobType` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE', 'TEMPORARY') NOT NULL;
