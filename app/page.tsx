"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import cmpu from "../public/logo-final-eleicao-CMPU_300x200.png"
import logo from "../public/logo-urban.png"

// --- COMPONENTE PRINCIPAL DO FORMULÁRIO ---
export default function CMPUForm() {
  // --- ESTADOS DO FORMULÁRIO ---
  // Controle do tipo de inscrição (Chapa ou Individual)
  const [tipoInscricao, setTipoInscricao] = useState("chapa");
  
  // Campos de texto
  const [nomeChapa, setNomeChapa] = useState("");
  const [nomeEntidade, setNomeEntidade] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmeEmail, setConfirmeEmail] = useState("");

  // Campo de seleção (Radio Button)
  const [segmento, setSegmento] = useState("");

  // Campos de arquivo
  const [documentoEntidade, setDocumentoEntidade] = useState<File | null>(null);
  const [documentoCandidato, setDocumentoCandidato] = useState<File | null>(null);

  // Campo de confirmação (Checkbox)
  const [confirmo, setConfirmo] = useState(false);

  // --- FUNÇÃO DE SUBMISSÃO DO FORMULÁRIO ---
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Previne o comportamento padrão de recarregar a página
    event.preventDefault();

    // 1. Validação de E-mail
    if (email !== confirmeEmail) {
      alert("Erro: Os campos de e-mail e confirmação de e-mail não coincidem.");
      return; // Interrompe a função se a validação falhar
    }
    
    // 2. Validação do checkbox de confirmação
    if (!confirmo) {
      alert("Você precisa confirmar que as informações são verdadeiras para enviar.");
      return; // Interrompe a função se a validação falhar
    }

    // 3. Criação do objeto com todos os dados capturados
    const dadosCapturados = {
      tipoInscricao,
      nomeChapa: tipoInscricao === "chapa" ? nomeChapa : null, 
      nomeEntidade,
      segmento,
      documentoEntidade, // Objeto do arquivo da entidade
      documentoCandidato, // Objeto do arquivo do candidato
      confirmo,
      nome,
      email,
    };

    // 4. Exibe o objeto no console do navegador
    console.log("--- DADOS CAPTURADOS PELO FORMULÁRIO ---");
    console.log(dadosCapturados);
    alert("Dados capturados com sucesso! Verifique o console do navegador (F12) para ver o objeto.");
  };

  // --- RENDERIZAÇÃO DO COMPONENTE (JSX) ---
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-18">
      <div className="w-full max-w-[1500px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <Image src={cmpu} alt={"logo cmpu"} />
          <Image src={logo} alt={"logo sp"} />
        </div>

        {/* Edital Button */}
        <div className="flex px-6 pb-4 gap-9">
          <Link
            href="https://prefeitura.sp.gov.br/licenciamento/desenvolvimento_urbano/participacao_social/conselhos_e_orgaos_colegiados/cmpu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="rounded-full px-6 bg-transparent border-black border-2 w-44 h-13 font-bold text-lg"
            >
              Edital
            </Button>
          </Link>
        </div>

        {/* Type Selection */}
        <div className="flex px-6 pb-6 justify-between">
          <div className="mb-2">
            <div className="font-semibold text-sm font-bold text-[26px]">
              Tipo de inscrição
            </div>
            <div className="text-xs text-gray-600 text-[22px] font-medium text-primary">
              Escolha o tipo de inscrição que deseja realizar
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => setTipoInscricao("chapa")}
              className={`bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full w-44 h-13 font-bold text-lg transition-opacity duration-300 ${
                tipoInscricao !== "chapa" && "opacity-50"
              }`}
            >
              Chapa
            </Button>
            <Button
              onClick={() => setTipoInscricao("individual")}
              variant="outline"
              className={`bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-full border-pink-500 w-44 h-13 font-bold text-lg transition-opacity duration-300 ${
                tipoInscricao !== "individual" && "opacity-50"
              }`}
            >
              Individual
            </Button>
          </div>
        </div>
        {/*borda preta */}
        <div className="w-full">
          <div className="w-[96%] border-b-4 border-black mt-2 mx-auto mb-4"></div>
        </div>

        {/* Form */}
        <div className="px-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[26px]">
              Formulário de inscrição de candidatura
            </h2>
            <p className="text-[22px] font-medium text-primary">
              Preencha os campos abaixo para realizar a inscrição para uma das
              22 vagas no Conselho Municipal de Política Urbana (CMPU)
            </p>
          </div>

          {/* Informações da chapa */}
          <div className="mb-6 border-foreground border-2">
            <div className="bg-foreground text-white p-3 font-semibold">
              Informações da chapa
            </div>
            <div className="border border-gray-300 p-4 space-y-4">
              {tipoInscricao === "chapa" && (
                <div>
                  <Label htmlFor="nome-chapa" className="text-sm font-medium">
                    Nome da chapa
                  </Label>
                  <Input
                    id="nome-chapa"
                    value={nomeChapa}
                    onChange={(e) => setNomeChapa(e.target.value)}
                    className="mt-1 border-black border-2 h-[50px]"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="nome-entidade" className="text-sm font-medium">
                  Nome da entidade
                </Label>
                <Input
                  id="nome-entidade"
                  value={nomeEntidade}
                  onChange={(e) => setNomeEntidade(e.target.value)}
                  className="mt-1 border-black border-2 h-[50px]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Segmento</Label>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-sm">
                  {/* Coluna 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimento-moradia" name="segmento" value="MOVIMENTO_DE_MORADIA" checked={segmento === "MOVIMENTO_DE_MORADIA"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="movimento-moradia">Movimento de moradia</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="entidades-academicas" name="segmento" value="ENTIDADES_ACADEMICAS_DE_PESQUISA" checked={segmento === "ENTIDADES_ACADEMICAS_DE_PESQUISA"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="entidades-academicas">Entidades acadêmicas e de pesquisa</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimentos-mobilidade" name="segmento" value="MOVIMENTOS_DE_MOBILIDADE_URBANA" checked={segmento === "MOVIMENTOS_DE_MOBILIDADE_URBANA"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="movimentos-mobilidade">Movimentos de Mobilidade Urbana</label>
                    </div>
                  </div>

                  {/* Coluna 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="associacoes-bairro" name="segmento" value="ASSOCIACOES_DE_BAIRRO" checked={segmento === "ASSOCIACOES_DE_BAIRRO"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="associacoes-bairro">Associações de bairro</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimento-ambientalista" name="segmento" value="MOVIMENTOS_AMBIENTALISTAS" checked={segmento === "MOVIMENTOS_AMBIENTALISTAS"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="movimento-ambientalista">Movimentos ambientalistas</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="movimento-cultural" name="segmento" value="MOVIMENTO_CULTURAL" checked={segmento === "MOVIMENTO_CULTURAL"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="movimento-cultural">Movimento Cultural</label>
                    </div>
                  </div>

                  {/* Coluna 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="setor-empresarial" name="segmento" value="SETOR_EMPRESARIAL" checked={segmento === "SETOR_EMPRESARIAL"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="setor-empresarial">Setor empresarial</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="ongs" name="segmento" value="ONG" checked={segmento === "ONG"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="ongs">ONG</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="entidades-religiosas" name="segmento" value="ENTIDADE_RELIGIOSA" checked={segmento === "ENTIDADE_RELIGIOSA"} onChange={(e) => setSegmento(e.target.value)} className="w-4 h-4" />
                      <label htmlFor="entidades-religiosas">Entidade Religiosa</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Anexos */}
          <div className="mb-6  border-foreground border-2">
            <div className="bg-foreground text-white p-3 font-semibold">
              Anexos{" "}
              <span className="text-sm font-normal">
                (Limite máximo de 250mb)
              </span>
            </div>
            <div className="border border-gray-300 p-4 space-y-4">
              <div className="text-sm text-gray-700">
                Recomendamos que os documentos da candidatura sejam enviados no
                formato pasta compactada (Arquivo ZIP).{" "}
                <Link
                  href="https://eleicaocmpu2023.prefeitura.sp.gov.br/instrucoes-para-envio-da-documentacao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  clique aqui
                </Link>{" "}
                para instruções de como compactar os arquivos.
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Documento da entidade
                </Label>
                <div className="mt-1">
                  <label
                    htmlFor="doc-entidade"
                    className="inline-block bg-[#808080] text-white py-[6px] px-[18px] text-xs font-bold leading-[18px] cursor-pointer hover:brightness-90 transition-all"
                  >
                    escolher arquivo
                  </label>
                  <Input
                    id="doc-entidade"
                    type="file"
                    accept=".zip, .pdf, .txt"
                    onChange={(e) => e.target.files && setDocumentoEntidade(e.target.files[0])}
                    className="hidden"
                  />
                </div>
                {documentoEntidade && <span className="text-xs text-gray-500 mt-1 block">Arquivo selecionado: {documentoEntidade.name}</span>}
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Documento do candidato
                </Label>
                <div className="mt-1">
                  <label
                    htmlFor="doc-candidato"
                    className="inline-block bg-[#808080] text-white py-[6px] px-[18px] text-xs font-bold leading-[18px] cursor-pointer hover:brightness-90 transition-all"
                  >
                    escolher arquivo
                  </label>
                  <Input
                    id="doc-candidato"
                    type="file"
                    accept=".zip, .pdf, .txt"
                    onChange={(e) => e.target.files && setDocumentoCandidato(e.target.files[0])}
                    className="hidden"
                  />
                </div>
                {documentoCandidato && <span className="text-xs text-gray-500 mt-1 block">Arquivo selecionado: {documentoCandidato.name}</span>}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="confirmo"
                  checked={confirmo}
                  onCheckedChange={(checked) => setConfirmo(checked as boolean)}
                  className=" border-foreground border-2"
                />
                <label htmlFor="confirmo" className="text-sm ">
                  Confirmo que as informações acima são verdadeiras
                </label>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="mb-6  border-foreground border-2">
            <div className="bg-foreground text-white p-3 font-semibold">
              Contato
            </div>
            <div className="border border-gray-300 p-4 space-y-4">
              <div>
                <Label htmlFor="nome" className="text-sm font-medium">
                  Nome
                </Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1 border-black border-2 h-[50px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 border-black border-2 h-[50px]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="confirme-email"
                    className="text-sm font-medium"
                  >
                    Confirme e-mail
                  </Label>
                  <Input
                    id="confirme-email"
                    type="email"
                    value={confirmeEmail}
                    onChange={(e) => setConfirmeEmail(e.target.value)}
                    className="mt-1 border-black border-2 h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pb-6 flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white w-44 h-13 font-bold px-12 py-3 rounded-full text-lg"
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}