/*
  Warnings:

  - You are about to drop the column `jam_mulai` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `jam_selesai` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_mulai` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_selesai` on the `peminjaman` table. All the data in the column will be lost.
  - Added the required column `waktu_mulai` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktu_selesai` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `jam_mulai`,
    DROP COLUMN `jam_selesai`,
    DROP COLUMN `tanggal_mulai`,
    DROP COLUMN `tanggal_selesai`,
    ADD COLUMN `waktu_mulai` DATETIME(3) NOT NULL,
    ADD COLUMN `waktu_selesai` DATETIME(3) NOT NULL;
