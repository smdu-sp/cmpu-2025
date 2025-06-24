-- CreateEnum
CREATE TYPE "Tipo_Usuario" AS ENUM ('INTERNO', 'EXTERNO');

-- AlterEnum
ALTER TYPE "Permissao" ADD VALUE 'TOTAL';

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "senha" TEXT,
ADD COLUMN     "tipo" "Tipo_Usuario" NOT NULL DEFAULT 'INTERNO',
ALTER COLUMN "login" DROP NOT NULL;
