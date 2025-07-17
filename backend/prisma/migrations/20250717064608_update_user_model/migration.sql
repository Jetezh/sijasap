-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_fakultas_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_unit_universitas_id_fkey`;

-- DropIndex
DROP INDEX `user_fakultas_id_fkey` ON `user`;

-- DropIndex
DROP INDEX `user_unit_universitas_id_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `fakultas_id` INTEGER NULL,
    MODIFY `unit_universitas_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_fakultas_id_fkey` FOREIGN KEY (`fakultas_id`) REFERENCES `Fakultas`(`id_fakultas`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_unit_universitas_id_fkey` FOREIGN KEY (`unit_universitas_id`) REFERENCES `UnitUniversitas`(`id_unit_univesitas`) ON DELETE SET NULL ON UPDATE CASCADE;
