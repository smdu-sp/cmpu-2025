/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `cadastros` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `cadastros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cadastros" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cadastros_cpf_key" ON "cadastros"("cpf");
