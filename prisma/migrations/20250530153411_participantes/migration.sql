-- AlterTable
ALTER TABLE "cadastros" ADD COLUMN     "equipe" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "participantes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "cadastroId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participantes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "participantes" ADD CONSTRAINT "participantes_cadastroId_fkey" FOREIGN KEY ("cadastroId") REFERENCES "cadastros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
