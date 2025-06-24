/*
  Warnings:

  - You are about to alter the column `cep` on the `cadastros` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.
  - Added the required column `carteira_numero` to the `cadastros` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tipo_Carteira" AS ENUM ('CAU', 'CREA');

-- AlterTable
ALTER TABLE "cadastros" ADD COLUMN     "carteira_numero" TEXT NOT NULL,
ADD COLUMN     "carteira_tipo" "Tipo_Carteira" NOT NULL DEFAULT 'CAU',
ALTER COLUMN "cep" SET DATA TYPE VARCHAR(9);
