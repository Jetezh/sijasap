/*
  Warnings:

  - You are about to drop the column `role_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_role_id_fkey`;

-- DropIndex
DROP INDEX `user_role_id_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role_id`,
    ADD COLUMN `role` ENUM('ADMIN', 'SUPERADMIN', 'DOSEN', 'MAHASISWA') NOT NULL;

-- DropTable
DROP TABLE `role`;
