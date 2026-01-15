/*
  Warnings:

  - You are about to drop the column `dosne_penanggung_jawab` on the `peminjaman` table. All the data in the column will be lost.
  - Added the required column `nomor_telepon` to the `peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `dosne_penanggung_jawab`,
    ADD COLUMN `dosen_penanggung_jawab` VARCHAR(255) NULL,
    ADD COLUMN `nomor_telepon` INTEGER NOT NULL;

-- RenameIndex
ALTER TABLE `harilibur` RENAME INDEX `harilibur_fakultas_id_fkey` TO `HariLibur_fakultas_id_fkey`;

-- RenameIndex
ALTER TABLE `harilibur` RENAME INDEX `harilibur_unit_universitas_id_fkey` TO `HariLibur_unit_universitas_id_fkey`;

-- RenameIndex
ALTER TABLE `jadwalkuliah` RENAME INDEX `jadwalkuliah_id_ruangan_fkey` TO `JadwalKuliah_id_ruangan_fkey`;

-- RenameIndex
ALTER TABLE `kalenderakademik` RENAME INDEX `kalenderakademik_fakultas_id_fkey` TO `KalenderAkademik_fakultas_id_fkey`;

-- RenameIndex
ALTER TABLE `kalenderakademik` RENAME INDEX `kalenderakademik_unit_universitas_id_fkey` TO `KalenderAkademik_unit_universitas_id_fkey`;

-- RenameIndex
ALTER TABLE `peminjaman` RENAME INDEX `peminjaman_alasan_ditolak_id_fkey` TO `Peminjaman_alasan_ditolak_id_fkey`;

-- RenameIndex
ALTER TABLE `peminjaman` RENAME INDEX `peminjaman_id_ruangan_fkey` TO `Peminjaman_id_ruangan_fkey`;

-- RenameIndex
ALTER TABLE `peminjaman` RENAME INDEX `peminjaman_id_user_fkey` TO `Peminjaman_id_user_fkey`;

-- RenameIndex
ALTER TABLE `peminjaman` RENAME INDEX `peminjaman_status_peminjaman_id_fkey` TO `Peminjaman_status_peminjaman_id_fkey`;

-- RenameIndex
ALTER TABLE `ruangan` RENAME INDEX `ruangan_fakultas_id_fkey` TO `Ruangan_fakultas_id_fkey`;

-- RenameIndex
ALTER TABLE `ruangan` RENAME INDEX `ruangan_unit_universitas_id_fkey` TO `Ruangan_unit_universitas_id_fkey`;

-- RenameIndex
ALTER TABLE `ruanganfasilitas` RENAME INDEX `ruanganfasilitas_id_fasilitas_fkey` TO `RuanganFasilitas_id_fasilitas_fkey`;
