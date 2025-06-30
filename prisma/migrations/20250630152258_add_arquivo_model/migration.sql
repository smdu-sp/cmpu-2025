/*
  Warnings:

  - You are about to drop the column `anexoPath` on the `Inscricao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Inscricao` DROP COLUMN `anexoPath`;

-- CreateTable
CREATE TABLE `arquivos` (
    `id` VARCHAR(191) NOT NULL,
    `caminho` VARCHAR(191) NOT NULL,
    `inscricaoId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `arquivos_inscricaoId_key`(`inscricaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_inscricaoId_fkey` FOREIGN KEY (`inscricaoId`) REFERENCES `Inscricao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
