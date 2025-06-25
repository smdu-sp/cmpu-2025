/**
 * @format
 */

'use client';

import DragDropInput from '@/components/drag-drop-input';
import Stepper, { Step } from '@/components/stepper';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, startTransition, useState } from 'react';
import { toast } from 'sonner';


import { IInscricaoDto } from '../api/inscricao/inscricao.dto';
import ModalConcluido from './_components/modal-concluido';


enum Segmento {
	MOVIMENTO_DE_MORADIA = 'MOVIMENTO_DE_MORADIA',
	ENTIDADES_ACADEMICAS_DE_PESQUISA = 'ENTIDADES_ACADEMICAS_DE_PESQUISA',
	ASSOCIACOES_DE_BAIRRO = 'ASSOCIACOES_DE_BAIRRO',
	MOVIMENTOS_AMBIENTALISTAS = 'MOVIMENTOS_AMBIENTALISTAS',
	SETOR_EMPRESARIAL = 'SETOR_EMPRESARIAL',
}

export default function Inscricao() {
	const initialStep = 1;
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(initialStep);
	const [protocolo, setProtocolo] = useState('');
	const router = useRouter();

	const [tipoCadastro, setTipoCadastro] = useState<string>('');
	const [nomeChapa, setNomeChapa] = useState<string>('');
	const [nomeEntidade, setNomeEntidade] = useState<string>('');
	const [segmento, setSegmento] = useState<Segmento | ''>('');
	const [is_chapa, setIsChapa] = useState<boolean>(false);
	const [nome, setNome] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [anexoPath, setAnexoPath] = useState<string>('');

	const [termos, setTermos] = useState(false);
	const [envioUnico, setEnvioUnico] = useState(false);

	function Finalizado() {
		return (
			<div className='flex flex-col p-2 px-8 md:px-16 md:py-4'>
				<h2 className='text-lg mb-2'>Dados da Inscrição</h2>
				<div className='flex flex-col gap-2 text-muted-foreground'>
					<p>Nome do Contato: {nome}</p>
					<p>Email do Contato: {email}</p>
					<p>Tipo de Cadastro: {tipoCadastro}</p>
					<p>Nome da Entidade: {nomeEntidade}</p>
					<p>Segmento: {segmento}</p>
					{/* Mostra o nome da chapa apenas se is_chapa for verdadeiro */}
					{is_chapa && <p>Nome da Chapa: {nomeChapa}</p>}
				</div>
				<Separator className='my-4' />
				<h2 className='text-lg mb-2'>Documentos enviados</h2>
				<div className='flex flex-col gap-2 text-muted-foreground'>
					{/* Exibe o caminho do anexo se existir, senão, uma mensagem padrão */}
					<p>Anexo Principal: {anexoPath ? anexoPath : 'Nenhum arquivo anexado'}</p>
				</div>
				<Separator className='my-4' />
				<FormItem className='gap-1 flex items-center space-x-2'>
					<Checkbox
						name='termos'
						checked={termos}
						onCheckedChange={(checked) => setTermos(checked as boolean)}
					/>
					<Label
						htmlFor='termos'
						className='cursor-pointer'
						onClick={() => setTermos(!termos)}>
						Declaro que as informações aqui prestadas são verdadeiras mediante
						pena de lei .....
					</Label>
				</FormItem>
			</div>
		);
	}

	function Submit() {
		return (
			<Button
				disabled={!termos || !stepCompleted()}
				variant={termos && stepCompleted() ? 'default' : 'outline'}
				type='submit'>
				{termos
					? !stepCompleted()
						? 'Formulário incompleto'
						: 'Enviar'
					: 'Você deve aceitar os termos'} {/* Mensagem se os termos não forem aceitos */}
			</Button>
		);
	}

	async function handleSubmit(
		event?: BaseSyntheticEvent<object, any, any> | undefined,
	) {
		event?.preventDefault();

		const inscricaoData: IInscricaoDto = {
			tipoCadastro,
			nomeEntidade,
			segmento: segmento as Segmento, // Faz um "cast" para o tipo Segmento do enum
			is_chapa,
			nome, // Nome do contato
			email, // Email do contato
			anexoPath, // O caminho do anexo já deve ter sido definido após o upload
		};

		// Se a inscrição representa uma chapa, adicione o nome da chapa aos dados.
		if (is_chapa) {
			inscricaoData.nomeChapa = nomeChapa;
		}

		// startTransition é um hook do React 18 que permite que atualizações de estado
		// que podem ser demoradas não bloqueiem a interface do usuário.
		startTransition(async () => {
			try {
				// Faz a requisição POST para a sua nova API de inscrição.
				// Usa NEXT_PUBLIC_BASE_URL para garantir que a URL seja dinâmica e funcione em produção.
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/inscricao`,
					{
						method: 'POST',
						// Muito importante: Definir o cabeçalho 'Content-Type' como 'application/json'
						// pois estamos enviando um objeto JSON, e não FormData.
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(inscricaoData), // Converte o objeto JavaScript para uma string JSON
					},
				);

				// Verifica se a requisição foi bem-sucedida (status 201 Created)
				if (res.status === 201) {
					const data = await res.json(); // Pega a resposta JSON da API
					setProtocolo(data.id); // O protocolo será o ID da inscrição criada (assumindo que a API retorna o objeto completo)
					setOpen(true); // Abre o modal de conclusão
				} else {
					// Se a requisição não foi bem-sucedida, tenta pegar a mensagem de erro da API
					const errorData = await res.json();
					toast.error(`Erro ao enviar inscrição: ${errorData.message || 'Tente novamente.'}`);
				}
			} catch (error) {
				// Captura erros de rede ou outros erros que possam ocorrer na requisição
				console.error('Erro de rede ao enviar inscrição:', error);
				toast.error('Erro de rede ao enviar inscrição. Por favor, tente novamente.');
			}
		});
	}

	/**
	 * Função para fechar o modal de conclusão e redirecionar para a página de sucesso.
	 */
	function handleClose() {
		router.push('/sucesso'); // Redireciona para a página /sucesso
		setOpen(false); // Fecha o modal
	}

	/**
	 * Verifica se a etapa atual do formulário foi completamente preenchida e validada.
	 */
	function stepCompleted() {
		let completed = true;
		switch (step) {
			case 1: // Etapa 1: Instruções e aceitação de envio único
				completed = checkStep1();
				break;
			case 2: // Etapa 2: Dados da inscrição (contato, entidade, segmento, chapa)
				completed = checkStep2();
				break;
			case 3: // Etapa 3: Upload do anexo
				completed = checkStep3();
				break;
			case 4: // Etapa 4: Revisão e aceitação dos termos
				completed = checkStep4();
				break;
			// Não há mais etapas neste novo fluxo, então não precisamos de outros `case`
		}
		return completed;
	}

	/**
	 * Validação para a Etapa 1: Verifica se a checkbox de "envio único" foi marcada.
	 */
	function checkStep1() {
		return envioUnico;
	}

	/**
	 * Validação para a Etapa 2: Verifica se todos os campos obrigatórios da inscrição foram preenchidos.
	 */
	function checkStep2() {
		let isValid = true;
		// Verifica se os campos básicos estão preenchidos e têm formato mínimo
		if (
			!nome ||
			!email ||
			!tipoCadastro ||
			!nomeEntidade ||
			!segmento ||
			nome === '' ||
			email === '' ||
			tipoCadastro === '' ||
			nomeEntidade === '' ||
			segmento === '' ||
			!email.includes('@') // Validação simples de email
		) {
			isValid = false;
		}

		// Se for uma chapa, o nome da chapa também é obrigatório
		if (is_chapa && !nomeChapa) {
			isValid = false;
		}
		return isValid;
	}

	/**
	 * Validação para a Etapa 3: Verifica se um anexo foi carregado (anexoPath não está vazio).
	 */
	function checkStep3() {
		return anexoPath !== '';
	}

	/**
	 * Validação para a Etapa 4 (final): Verifica se os termos foram aceitos.
	 */
	function checkStep4() {
		return termos;
	}

	return (
		<div className='container mx-auto h-full min-h-screen flex items-center justify-center'>
			<div className='max-w-3xl w-full mx-auto '>
				{/* O formulário React, ao ser submetido, chama a função handleSubmit */}
				<form onSubmit={handleSubmit}>
					{/* O componente Stepper gerencia as diferentes etapas do formulário */}
					<Stepper
						initialStep={initialStep}
						onStepChange={(currentStep) => setStep(currentStep)} // Atualiza o estado da etapa atual
						backButtonText='Voltar' // Texto do botão "Voltar"
						nextButtonText='Próximo' // Texto do botão "Próximo"
						completeButtonText='Finalizar' // Texto do botão "Finalizar" na última etapa
						disableStepIndicators={true} // Desabilita os indicadores de etapa visuais (bolinhas/números)
						stepCircleContainerClassName='w-full'
						contentClassName='my-6'
						final={<Finalizado />} // Componente a ser renderizado na etapa final
						submitButton={<Submit />} // Componente do botão de submissão
						disableNextButton={false} // Define se o botão "Próximo" é desabilitado (você pode usar stepCompleted() aqui)
					>
						{/* --- ETAPA 1: Instruções --- */}
						<Step>
							<div className='flex flex-col gap-4'>
								<h2>Instruções sobre o envio dos dados</h2>
								<span className='text-muted-foreground'>
									Preencha os campos abaixo com os dados da inscrição para a eleição.
									Os arquivos anexos devem ser enviados.
								</span>
								<span className='font-bold'>
									O ENVIO É ÚNICO, NÃO SERÁ POSSÍVEL ALTERAR OS DADOS ENVIADOS.
								</span>
								<div className='gap-1 flex items-center space-x-2'>
									<Checkbox
										name='envioUnico'
										onCheckedChange={(checked) =>
											setEnvioUnico(checked as boolean)
										}
										checked={envioUnico}
									/>
									<Label
										className='cursor-pointer'
										onClick={() => setEnvioUnico(!envioUnico)}>
										Declaro que li e desejo continuar.
									</Label>
								</div>
							</div>
						</Step>

						{/* --- ETAPA 2: Dados da Inscrição --- */}
						<Step>
							<div className='flex flex-col gap-4'>
								<div className='grid grid-cols-4 gap-6'>
									<div className='col-span-4 flex flex-col gap-3'>
										<Label htmlFor='nome'>Nome do Contato</Label>
										<Input
											id='nome'
											placeholder='Seu nome completo'
											name='nome'
											value={nome}
											onChange={(e) => setNome(e.target.value)}
										/>
									</div>
									<div className='col-span-4 flex flex-col gap-3'>
										<Label htmlFor='email'>Email do Contato</Label>
										<Input
											id='email'
											placeholder='seu.email@exemplo.com'
											name='email'
											type='email'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className='col-span-4 flex flex-col gap-3'>
										<Label htmlFor='tipoCadastro'>Tipo de Cadastro</Label>
										<Input
											id='tipoCadastro'
											placeholder='Ex: Candidato, Associação'
											name='tipoCadastro'
											value={tipoCadastro}
											onChange={(e) => setTipoCadastro(e.target.value)}
										/>
									</div>
									<div className='col-span-4 flex flex-col gap-3'>
										<Label htmlFor='nomeEntidade'>Nome da Entidade</Label>
										<Input
											id='nomeEntidade'
											placeholder='Nome da sua entidade/organização'
											name='nomeEntidade'
											value={nomeEntidade}
											onChange={(e) => setNomeEntidade(e.target.value)}
										/>
									</div>
									<div className='col-span-4 flex flex-col gap-3'>
										<Label htmlFor='segmento'>Segmento</Label>
										<Select
											onValueChange={(value: Segmento) => setSegmento(value)} // Garante que o valor seja do tipo Segmento
											value={segmento}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Selecione o segmento' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Segmentos</SelectLabel>
													{/* Mapeia os valores do enum Segmento para os SelectItem */}
													{Object.values(Segmento).map((seg) => (
														<SelectItem key={seg} value={seg}>
															{/* Converte para um formato mais legível (ex: MOVIMENTO_DE_MORADIA -> Movimento de Moradia) */}
															{seg.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
									<div className='col-span-4 gap-1 flex items-center space-x-2'>
										<Checkbox
											name='is_chapa'
											onCheckedChange={(checked) =>
												setIsChapa(checked as boolean)
											}
											checked={is_chapa}
										/>
										<Label
											className='cursor-pointer'
											onClick={() => setIsChapa(!is_chapa)}>
											Essa inscrição representa uma chapa.
										</Label>
									</div>
									{/* Mostra o campo "Nome da Chapa" apenas se a checkbox "is_chapa" estiver marcada */}
									{is_chapa && (
										<div className='col-span-4 flex flex-col gap-3'>
											<Label htmlFor='nomeChapa'>Nome da Chapa</Label>
											<Input
												id='nomeChapa'
												placeholder='Nome da chapa'
												name='nomeChapa'
												value={nomeChapa}
												onChange={(e) => setNomeChapa(e.target.value)}
											/>
										</div>
									)}
								</div>
							</div>
						</Step>

						{/* --- ETAPA 3: Upload do Anexo --- */}
						<Step>
							<div className='col-span-4 flex flex-col gap-3'>
								<div className='leading-none font-semibold'>Anexo da Inscrição</div>
								<span className='text-muted-foreground'>
									Faça o upload do documento principal da sua inscrição (ex: PDF com a proposta).
								</span>
								<DragDropInput
									multiple={false} // Apenas um arquivo pode ser anexado
									maxSize={50 * 1024 * 1024} // Tamanho máximo do arquivo: 50MB
									accept='.pdf,.doc,.docx' // Tipos de arquivo aceitos
									helperText='Máximo 50MB. Somente PDF, DOC, DOCX.'
									onChange={async (files) => {
										// Esta função é chamada quando arquivos são selecionados ou arrastados.
										if (files.length > 0) {
											const fileToUpload = files[0]; // Pega o primeiro (e único) arquivo
											const uploadFormData = new FormData(); // Cria um FormData para enviar o arquivo
											uploadFormData.append('file', fileToUpload); // Adiciona o arquivo ao FormData

											try {
												// Faz a requisição para a sua API de upload de arquivos
												const uploadRes = await fetch(
													`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/upload`,
													{
														method: 'POST',
														body: uploadFormData, // Envia o FormData com o arquivo
													}
												);

												// Verifica se o upload foi bem-sucedido
												if (uploadRes.ok) {
													const uploadData = await uploadRes.json();
													// Atualiza o estado 'anexoPath' com o caminho retornado pela API de upload
													setAnexoPath(uploadData.anexoPath);
													toast.success('Anexo enviado com sucesso!');
												} else {
													// Em caso de erro no upload, exibe uma mensagem de erro
													const errorUploadData = await uploadRes.json();
													toast.error(`Erro ao enviar anexo: ${errorUploadData.message || 'Tente novamente.'}`);
													setAnexoPath(''); // Limpa o anexoPath se der erro
												}
											} catch (error) {
												// Captura erros de rede durante o upload
												console.error('Erro de rede ao enviar anexo:', error);
												toast.error('Erro de rede ao enviar anexo. Verifique sua conexão.');
												setAnexoPath('');
											}
										} else {
											setAnexoPath(''); // Limpa o anexoPath se o arquivo for removido
										}
									}}
									// Adaptação para exibir o nome do arquivo se já tiver um anexoPath definido
									value={anexoPath ? [{ name: anexoPath } as File] : []}
								/>
							</div>
						</Step>

						{/* --- ETAPA FINAL: Revisão e Termos --- */}
						{/* O componente 'Finalizado' já inclui os termos de aceitação */}
						<Step>
							<Finalizado />
						</Step>
					</Stepper>
				</form>
				{/* Modal de Conclusão que aparece quando a inscrição é enviada com sucesso */}
				<ModalConcluido
					open={open}
					protocolo={protocolo}
					onClose={handleClose}
				/>
			</div>
		</div>
	);
}
