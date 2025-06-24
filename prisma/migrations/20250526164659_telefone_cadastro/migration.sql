/*
  Warnings:

  - Added the required column `telefone` to the `cadastros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cadastros" ADD COLUMN     "telefone" TEXT NOT NULL;
