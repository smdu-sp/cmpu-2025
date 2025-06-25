// app/api/inscricao/route.ts
// Esta é a "porta de entrada" para o seu backend para criar novas inscrições.
// Quando o formulário envia dados, eles vêm para cá.

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { ICadastroDto } from './inscricao.dto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data: ICadastroDto = await request.json();

        const {
            tipoCadastro,
            nomeChapa,
            nomeEntidade,
            segmento,
            is_chapa,
            nome,
            email,
            anexoPath,
        } = data;

        const inscricao = await prisma.inscricao.create({
            data: {
                tipoCadastro,
                nomeChapa,
                nomeEntidade,
                segmento,
                is_chapa,
                nome,
                email,
                anexoPath,
            }
        })

        return NextResponse.json(inscricao, { status: 201 })

    } catch (error: any) {
        console.error("Erro ao criar inscrição:", error);
        return NextResponse.json({ message: "Erro ao criar inscrição", error: error.message }, { status: 500 });
    }
}