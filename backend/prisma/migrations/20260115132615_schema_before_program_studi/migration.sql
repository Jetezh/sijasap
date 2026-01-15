/*
  Warnings:

  - You are about to drop the column `tujuan` on the `peminjaman` table. All the data in the column will be lost.
  - Added the required column `jenis_kegiatan` to the `peminjaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_kegiatan` to the `peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `harilibur` DROP FOREIGN KEY `HariLibur_fakultas_id_fkey`;

-- DropForeignKey
ALTER TABLE `harilibur` DROP FOREIGN KEY `HariLibur_unit_universitas_id_fkey`;

-- DropForeignKey
ALTER TABLE `jadwalkuliah` DROP FOREIGN KEY `JadwalKuliah_id_ruangan_fkey`;

-- DropForeignKey
ALTER TABLE `kalenderakademik` DROP FOREIGN KEY `KalenderAkademik_fakultas_id_fkey`;

-- DropForeignKey
ALTER TABLE `kalenderakademik` DROP FOREIGN KEY `KalenderAkademik_unit_universitas_id_fkey`;

-- DropForeignKey
ALTER TABLE `peminjaman` DROP FOREIGN KEY `Peminjaman_alasan_ditolak_id_fkey`;

-- DropForeignKey
ALTER TABLE `peminjaman` DROP FOREIGN KEY `Peminjaman_id_ruangan_fkey`;

-- DropForeignKey
ALTER TABLE `peminjaman` DROP FOREIGN KEY `Peminjaman_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `peminjaman` DROP FOREIGN KEY `Peminjaman_status_peminjaman_id_fkey`;

-- DropForeignKey
ALTER TABLE `ruangan` DROP FOREIGN KEY `Ruangan_fakultas_id_fkey`;

-- DropForeignKey
ALTER TABLE `ruangan` DROP FOREIGN KEY `Ruangan_unit_universitas_id_fkey`;

-- DropForeignKey
ALTER TABLE `ruanganfasilitas` DROP FOREIGN KEY `RuanganFasilitas_id_fasilitas_fkey`;

-- DropForeignKey
ALTER TABLE `ruanganfasilitas` DROP FOREIGN KEY `RuanganFasilitas_id_ruangan_fkey`;

-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `tujuan`,
    ADD COLUMN `dosne_penanggung_jawab` VARCHAR(255) NULL,
    ADD COLUMN `jenis_kegiatan` ENUM('PERKULIAHAN', 'PRAKTIKUM', 'PENELITIAN', 'SIDANG_SKRIPSI', 'LAINNYA') NOT NULL,
    ADD COLUMN `kebutuhan_alat` VARCHAR(255) NULL,
    ADD COLUMN `keterangan_tambahan` VARCHAR(255) NULL,
    ADD COLUMN `mata_kuliah` VARCHAR(255) NULL,
    ADD COLUMN `nama_kegiatan` VARCHAR(255) NOT NULL,
    ADD COLUMN `path_file_surat` VARCHAR(255) NULL,
    MODIFY `alasan_ditolak_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `program_studi` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `harilibur` ADD CONSTRAINT `harilibur_fakultas_id_fkey` FOREIGN KEY (`fakultas_id`) REFERENCES `fakultas`(`id_fakultas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `harilibur` ADD CONSTRAINT `harilibur_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `unituniversitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwalkuliah` ADD CONSTRAINT `jadwalkuliah_id_ruangan_fkey` FOREIGN KEY (`id_ruangan`) REFERENCES `ruangan`(`id_ruangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kalenderakademik` ADD CONSTRAINT `kalenderakademik_fakultas_id_fkey` FOREIGN KEY (`fakultas_id`) REFERENCES `fakultas`(`id_fakultas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kalenderakademik` ADD CONSTRAINT `kalenderakademik_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `unituniversitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_alasan_ditolak_id_fkey` FOREIGN KEY (`alasan_ditolak_id`) REFERENCES `alasanpenolakan`(`id_alasan_penolakan`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_id_ruangan_fkey` FOREIGN KEY (`id_ruangan`) REFERENCES `ruangan`(`id_ruangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_status_peminjaman_id_fkey` FOREIGN KEY (`status_peminjaman_id`) REFERENCES `statuspeminjaman`(`id_status_peminjaman`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ruangan` ADD CONSTRAINT `ruangan_fakultas_id_fkey` FOREIGN KEY (`fakultas_id`) REFERENCES `fakultas`(`id_fakultas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ruangan` ADD CONSTRAINT `ruangan_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `unituniversitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ruanganfasilitas` ADD CONSTRAINT `ruanganfasilitas_id_fasilitas_fkey` FOREIGN KEY (`id_fasilitas`) REFERENCES `fasilitas`(`id_fasilitas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ruanganfasilitas` ADD CONSTRAINT `ruanganfasilitas_id_ruangan_fkey` FOREIGN KEY (`id_ruangan`) REFERENCES `ruangan`(`id_ruangan`) ON DELETE RESTRICT ON UPDATE CASCADE;
