import { NextResponse } from "next/server"
import { ViaCepResposta } from "./cep.dto";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ cep: string }> }
) {
  const { cep } = await params
  if (!cep || cep === "") return NextResponse.json({
    status: 400,
    error: "CEP é obrigatório!"
  })
  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data: ViaCepResposta = await resposta.json()
  try {
    return NextResponse.json({
      status: 200,
    })
  } catch (err) {
    return NextResponse.json({
      status: 500,
      error: "CEP não encontrado"
    })
  }
}