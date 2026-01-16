/*
  Warnings:

  - You are about to drop the column `nama_status` on the `statuspeminjaman` table. All the data in the column will be lost.
  - Added the required column `keterangan_status` to the `statuspeminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `StatusPeminjaman_nama_status_key` ON `statuspeminjaman`;

-- AlterTable
ALTER TABLE `statuspeminjaman` DROP COLUMN `nama_status`,
    ADD COLUMN `keterangan_status` ENUM('DIPROSES', 'DITERIMA', 'DITOLAK', 'SELESAI') NOT NULL;
