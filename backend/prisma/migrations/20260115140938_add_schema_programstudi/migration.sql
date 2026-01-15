/*
  Warnings:

  - You are about to drop the column `program_studi` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `program_studi`,
    ADD COLUMN `program_studi_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `programstudi` (
    `id_program_studi` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_program_studi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_program_studi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `user_program_studi_id_fkey` ON `user`(`program_studi_id`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_program_studi_id_fkey` FOREIGN KEY (`program_studi_id`) REFERENCES `programstudi`(`id_program_studi`) ON DELETE SET NULL ON UPDATE CASCADE;
