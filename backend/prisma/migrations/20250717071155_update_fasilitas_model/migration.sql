/*
  Warnings:

  - You are about to drop the `fasilitasruangan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fasilitasruangan` DROP FOREIGN KEY `FasilitasRuangan_id_ruangan_fkey`;

-- DropTable
DROP TABLE `fasilitasruangan`;

-- CreateTable
CREATE TABLE `Fasilitas` (
    `id_fasilitas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_fasilitas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_fasilitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RuanganFasilitas` (
    `id_ruangan` INTEGER NOT NULL,
    `id_fasilitas` INTEGER NOT NULL,

    PRIMARY KEY (`id_ruangan`, `id_fasilitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RuanganFasilitas` ADD CONSTRAINT `RuanganFasilitas_id_ruangan_fkey` FOREIGN KEY (`id_ruangan`) REFERENCES `Ruangan`(`id_ruangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RuanganFasilitas` ADD CONSTRAINT `RuanganFasilitas_id_fasilitas_fkey` FOREIGN KEY (`id_fasilitas`) REFERENCES `Fasilitas`(`id_fasilitas`) ON DELETE RESTRICT ON UPDATE CASCADE;
