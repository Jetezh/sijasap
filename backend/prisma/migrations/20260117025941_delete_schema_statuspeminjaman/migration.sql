/*
  Warnings:

  - You are about to drop the column `status_peminjaman_id` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the `statuspeminjaman` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `peminjaman` DROP FOREIGN KEY `peminjaman_status_peminjaman_id_fkey`;

-- DropIndex
DROP INDEX `Peminjaman_status_peminjaman_id_fkey` ON `peminjaman`;

-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `status_peminjaman_id`,
    ADD COLUMN `status_peminjaman` ENUM('DIPROSES', 'DITERIMA', 'DITOLAK', 'SELESAI') NOT NULL DEFAULT 'DIPROSES';

-- DropTable
DROP TABLE `statuspeminjaman`;
