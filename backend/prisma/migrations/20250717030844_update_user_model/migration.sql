/*
  Warnings:

  - You are about to alter the column `nama_fakultas` on the `fakultas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `nama_ruangan` on the `ruangan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `nama_unit` on the `unitunivesitas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `nama_lengkap` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[email_upnvj]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `fakultas` MODIFY `nama_fakultas` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ruangan` MODIFY `nama_ruangan` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `unitunivesitas` MODIFY `nama_unit` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `email_upnvj` VARCHAR(191) NULL,
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `nama_lengkap` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `user`(`email_upnvj`);
