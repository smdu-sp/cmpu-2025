/*
  Warnings:

  - You are about to drop the column `tipoCadastro` on the `Inscricao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Inscricao` DROP COLUMN `tipoCadastro`,
    MODIFY `segmento` ENUM('MOVIMENTO_DE_MORADIA', 'ENTIDADES_ACADEMICAS_DE_PESQUISA', 'ASSOCIACOES_DE_BAIRRO', 'MOVIMENTOS_AMBIENTALISTAS', 'SETOR_EMPRESARIAL', 'MOVIMENTOS_DE_MOBILIDADE_URBANA', 'MOVIMENTO_CULTURAL', 'ONG', 'ENTIDADE_RELIGIOSA') NOT NULL;
