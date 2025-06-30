// app/api/inscricao/route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import fs from 'fs/promises';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const nome = formData.get('nome') as string;
        const email = formData.get('email') as string;
        const nomeEntidade = formData.get('nomeEntidade') as string;
        const segmento = formData.get('segmento') as string;
        const is_chapa_str = formData.get('is_chapa') as string;

        const is_chapa = is_chapa_str === 'true';

        const nomeChapa = (is_chapa && formData.get('nomeChapa')) ? (formData.get('nomeChapa') as string) : null;

        const tipoCadastro = is_chapa ? 'chapa' : 'individual';

        const documentoFile = formData.get('documento') as File | null;

        if (!nome || !email || !nomeEntidade || !segmento) {
            return NextResponse.json({ message: "Campos obrigatórios de inscrição ausentes." }, { status: 400 });
        }
        if (is_chapa && !nomeChapa) {
            return NextResponse.json({ message: "Nome da chapa é obrigatório para inscrições de chapa." }, { status: 400 });
        }
        if (!documentoFile) {
            return NextResponse.json({ message: "O documento de inscrição é obrigatório." }, { status: 400 });
        }

        const result = await prisma.$transaction(async (tx) => {

            const novaInscricao = await tx.inscricao.create({
                data: {
                    nome,
                    email,
                    nomeEntidade,
                    segmento: segmento as any,
                    is_chapa,
                    tipoCadastro,
                    nomeChapa,
                },
            });

            const buffer = Buffer.from(await documentoFile.arrayBuffer());
            const fileName = `${novaInscricao.id}-${Date.now()}-${documentoFile.name.replace(/\s/g, '_')}`;
            const uploadDir = `./public/uploads`;
            const filePath = `${uploadDir}/${fileName}`;

            await fs.mkdir(uploadDir, { recursive: true });
            await fs.writeFile(filePath, buffer);

            const publicPath = `/uploads/${fileName}`;

            const novoArquivo = await tx.arquivo.create({
                data: {
                    caminho: publicPath,
                    inscricaoId: novaInscricao.id,
                },
            });

            return { inscricao: novaInscricao, arquivo: novoArquivo };
        });

        return NextResponse.json(result.inscricao, { status: 201 });

    } catch (error: any) {
        console.error("Erro ao criar inscrição ou fazer upload:", error);
        return NextResponse.json({ message: "Erro ao criar inscrição ou fazer upload do arquivo.", error: error.message }, { status: 500 });
    }
}
