/*
  Warnings:

  - Added the required column `updatedAt` to the `Ruangan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ruangan` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imgUrl` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
