/*
  Warnings:

  - You are about to drop the `unitunivesitas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `harilibur` DROP FOREIGN KEY `HariLibur_unit_universitas_id_fkey`;

-- DropForeignKey
ALTER TABLE `kalenderakademik` DROP FOREIGN KEY `KalenderAkademik_unit_universitas_id_fkey`;

-- DropForeignKey
ALTER TABLE `ruangan` DROP FOREIGN KEY `Ruangan_unit_universitas_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_unit_universitas_id_fkey`;

-- DropIndex
DROP INDEX `HariLibur_unit_universitas_id_fkey` ON `harilibur`;

-- DropIndex
DROP INDEX `KalenderAkademik_unit_universitas_id_fkey` ON `kalenderakademik`;

-- DropIndex
DROP INDEX `Ruangan_unit_universitas_id_fkey` ON `ruangan`;

-- DropIndex
DROP INDEX `user_unit_universitas_id_fkey` ON `user`;

-- DropTable
DROP TABLE `unitunivesitas`;

-- CreateTable
CREATE TABLE `UnitUniversitas` (
    `id_unit_univesitas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_unit` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_unit_univesitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `UnitUniversitas`(`id_unit_univesitas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ruangan` ADD CONSTRAINT `Ruangan_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `UnitUniversitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KalenderAkademik` ADD CONSTRAINT `KalenderAkademik_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `UnitUniversitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HariLibur` ADD CONSTRAINT `HariLibur_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `UnitUniversitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;
