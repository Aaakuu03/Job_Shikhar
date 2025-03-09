-- AlterTable
ALTER TABLE `education` ADD COLUMN `college` VARCHAR(191) NULL,
    ADD COLUMN `currentlyStudying` BOOLEAN NOT NULL DEFAULT false;
