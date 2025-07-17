-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `nama_lengkap` VARCHAR(255) NULL,
    `role_id` INTEGER NOT NULL,
    `fakultas_id` INTEGER NOT NULL,
    `unit_universitas_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `role_nama_role_key`(`nama_role`),
    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fakultas` (
    `id_fakultas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_fakultas` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_fakultas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnitUnivesitas` (
    `id_unit_univesitas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_unit` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_unit_univesitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ruangan` (
    `id_ruangan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_ruangan` VARCHAR(255) NOT NULL,
    `gedung` VARCHAR(191) NOT NULL,
    `lantai` INTEGER NOT NULL,
    `kapasitas` INTEGER NOT NULL,
    `tipe_ruangan` VARCHAR(191) NOT NULL,
    `fakultas_id` INTEGER NULL,
    `unit_universitas_id` INTEGER NULL,

    PRIMARY KEY (`id_ruangan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FasilitasRuangan` (
    `id_fasilitas` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ruangan` INTEGER NOT NULL,
    `nama_fasilitas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_fasilitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peminjaman` (
    `id_peminjaman` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_ruangan` INTEGER NOT NULL,
    `tanggal_mulai` DATETIME(3) NOT NULL,
    `tanggal_selesai` DATETIME(3) NOT NULL,
    `jam_mulai` VARCHAR(191) NOT NULL,
    `jam_selesai` VARCHAR(191) NOT NULL,
    `tujuan` VARCHAR(191) NOT NULL,
    `jumlah_peserta` INTEGER NOT NULL,
    `status_peminjaman_id` INTEGER NOT NULL,
    `alasan_ditolak_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_peminjaman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusPeminjaman` (
    `id_status_peminjaman` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StatusPeminjaman_nama_status_key`(`nama_status`),
    PRIMARY KEY (`id_status_peminjaman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlasanPenolakan` (
    `id_alasan_penolakan` INTEGER NOT NULL AUTO_INCREMENT,
    `deskripsi_alasan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_alasan_penolakan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JadwalKuliah` (
    `id_jadwal` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ruangan` INTEGER NOT NULL,
    `hari` VARCHAR(191) NOT NULL,
    `jam` VARCHAR(191) NOT NULL,
    `semester` INTEGER NOT NULL,

    PRIMARY KEY (`id_jadwal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KalenderAkademik` (
    `id_event` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_event` VARCHAR(191) NOT NULL,
    `tanggal_mulai` DATETIME(3) NOT NULL,
    `tanggal_selesai` DATETIME(3) NOT NULL,
    `fakultas_id` INTEGER NULL,
    `unit_universitas_id` INTEGER NULL,

    PRIMARY KEY (`id_event`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HariLibur` (
    `id_hari_libur` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_libur` DATETIME(3) NOT NULL,
    `jenis_libur` VARCHAR(191) NOT NULL,
    `fakultas_id` INTEGER NULL,
    `unit_universitas_id` INTEGER NULL,

    PRIMARY KEY (`id_hari_libur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_fakultas_id_fkey` FOREIGN KEY (`fakultas_id`) REFERENCES `Fakultas`(`id_fakultas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `UnitUnivesitas`(`id_unit_univesitas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ruangan` ADD CONSTRAINT `Ruangan_fakultas_id_fkey` FOREIGN KEY (`fakultas_id`) REFERENCES `Fakultas`(`id_fakultas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ruangan` ADD CONSTRAINT `Ruangan_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `UnitUnivesitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FasilitasRuangan` ADD CONSTRAINT `FasilitasRuangan_id_ruangan_fkey` FOREIGN KEY (`id_ruangan`) REFERENCES `Ruangan`(`id_ruangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_id_ruangan_fkey` FOREIGN KEY (`id_ruangan`) REFERENCES `Ruangan`(`id_ruangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_status_peminjaman_id_fkey` FOREIGN KEY (`status_peminjaman_id`) REFERENCES `StatusPeminjaman`(`id_status_peminjaman`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_alasan_ditolak_id_fkey` FOREIGN KEY (`alasan_ditolak_id`) REFERENCES `AlasanPenolakan`(`id_alasan_penolakan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JadwalKuliah` ADD CONSTRAINT `JadwalKuliah_id_ruangan_fkey` FOREIGN KEY (`id_ruangan`) REFERENCES `Ruangan`(`id_ruangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KalenderAkademik` ADD CONSTRAINT `KalenderAkademik_fakultas_id_fkey` FOREIGN KEY (`fakultas_id`) REFERENCES `Fakultas`(`id_fakultas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KalenderAkademik` ADD CONSTRAINT `KalenderAkademik_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `UnitUnivesitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HariLibur` ADD CONSTRAINT `HariLibur_fakultas_id_fkey` FOREIGN KEY (`fakultas_id`) REFERENCES `Fakultas`(`id_fakultas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HariLibur` ADD CONSTRAINT `HariLibur_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `UnitUnivesitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;
