// app/api/inscricao/route.ts

import { PrismaClient, Segmento } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * Função auxiliar para validar se uma string é um valor válido do enum Segmento.
 * @param value A string a ser validada.
 * @returns true se a string for um valor válido do enum Segmento, caso contrário, false.
 */
function isValidSegmentoEnum(value: string): value is Segmento {
    return Object.values(Segmento).includes(value as Segmento);
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const nomeChapa = formData.get('nomeChapa') as string | null;
        const nomeEntidade = formData.get('nomeEntidade') as string;
        const segmento = formData.get('segmento') as string;
        const is_chapa_str = formData.get('is_chapa') as string;
        const nome = formData.get('nome') as string;
        const email = formData.get('email') as string;
        const arquivo = formData.get('arquivo') as File | null; // O arquivo em si

        const is_chapa = is_chapa_str === 'true';

        if (!isValidSegmentoEnum(segmento)) {
            return NextResponse.json(
                { message: `Segmento inválido fornecido: "${segmento}".` },
                { status: 400 }
            );
        }

        const inscricao = await prisma.inscricao.create({
            data: {
                nomeChapa: nomeChapa || null, 
                nomeEntidade,
                segmento: segmento as Segmento, 
                is_chapa,
                nome,
                email,
                // Removido tipoCadastro e anexoPath
            }
        });

        if (arquivo) {
            const anexoPath = `/uploads/${inscricao.id}-${arquivo.name}`;

            await prisma.arquivo.create({
                data: {
                    caminho: anexoPath,
                    inscricaoId: inscricao.id,
                }
            });
        }

        return NextResponse.json(inscricao, { status: 201 });

    } catch (error: any) {
        console.error("Erro ao criar inscrição:", error);
        return NextResponse.json({ message: "Erro ao criar inscrição", error: error.message }, { status: 500 });
    }
}
