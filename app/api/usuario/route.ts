// app/api/upload/route.ts
import { criarCadastro } from '@/services/cadastros';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        if (!cadastro) {
            return NextResponse.json({ message: 'Falha ao enviar cadastro' }, { status: 500 });
        }
        return NextResponse.json({ protocolo: cadastro }, { status: 201 });
    } catch (error: any) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ message: 'Falha ao enviar cadastro', error: error.message }, { status: 500 });
    }
}

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };
