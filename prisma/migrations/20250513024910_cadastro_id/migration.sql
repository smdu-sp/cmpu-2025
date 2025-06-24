/*
  Warnings:

  - The primary key for the `cadastros` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `cadastros` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `cadastroId` on the `arquivos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "arquivos" DROP CONSTRAINT "arquivos_cadastroId_fkey";

-- AlterTable
ALTER TABLE "arquivos" DROP COLUMN "cadastroId",
ADD COLUMN     "cadastroId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cadastros" DROP CONSTRAINT "cadastros_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "cadastros_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "arquivos" ADD CONSTRAINT "arquivos_cadastroId_fkey" FOREIGN KEY ("cadastroId") REFERENCES "cadastros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
