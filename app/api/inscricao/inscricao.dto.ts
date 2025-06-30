import { Segmento } from "@prisma/client";

export interface IInscricaoDto {
    tipoCadastro: string;
    nomeChapa?: string;
    nomeEntidade: string;
    segmento: Segmento;
    is_chapa: boolean;
    nome: string;
    email: string;
    arquivo: File;
}