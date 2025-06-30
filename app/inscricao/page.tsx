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

	// Removido o estado tipoCadastro
	const [nomeChapa, setNomeChapa] = useState<string>('');
	const [nomeEntidade, setNomeEntidade] = useState<string>('');
	const [segmento, setSegmento] = useState<Segmento | ''>('');
	const [is_chapa, setIsChapa] = useState<boolean>(false);
	const [nome, setNome] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [anexoPath, setAnexoPath] = useState<string>('');

	const [termos, setTermos] = useState(false);

	function Finalizado() {
		return (
			<div className='flex flex-col p-2 px-8 md:px-16 md:py-4'>
				<h2 className='text-lg mb-2'>Dados da Inscrição</h2>
				<div className='flex flex-col gap-2 text-muted-foreground'>
					<p>Nome do Contato: {nome}</p>
					<p>Email do Contato: {email}</p>
					{/* Removido o display de tipoCadastro */}
					<p>Nome da Entidade: {nomeEntidade}</p>
					<p>Segmento: {segmento}</p>
					{is_chapa && <p>Nome da Chapa: {nomeChapa}</p>}
				</div>
				<Separator className='my-4' />
				<h2 className='text-lg mb-2'>Documentos enviados</h2>
				<div className='flex flex-col gap-2 text-muted-foreground'>
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
					: 'Você deve aceitar os termos'}
			</Button>
		);
	}

	async function handleSubmit(
		event?: BaseSyntheticEvent<object, any, any> | undefined,
	) {
		event?.preventDefault();

		const inscricaoData: IInscricaoDto = {
			tipoCadastro: is_chapa ? 'chapa' : 'individual', // Define tipoCadastro baseado em is_chapa
			nomeEntidade,
			segmento: segmento as Segmento,
			is_chapa,
			nome,
			email,
			anexoPath,
		};

		if (is_chapa) {
			inscricaoData.nomeChapa = nomeChapa;
		}

		startTransition(async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/inscricao`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(inscricaoData),
					},
				);

				if (res.status === 201) {
					const data = await res.json();
					setProtocolo(data.id);
					setOpen(true);
				} else {
					const errorData = await res.json();
					toast.error(`Erro ao enviar inscrição: ${errorData.message || 'Tente novamente.'}`);
				}
			} catch (error) {
				console.error('Erro de rede ao enviar inscrição:', error);
				toast.error('Erro de rede ao enviar inscrição. Por favor, tente novamente.');
			}
		});
	}

	function handleClose() {
		router.push('/sucesso');
		setOpen(false);
	}

	function stepCompleted() {
		let completed = true;
		switch (step) {
			case 1:
				completed = checkStep1();
				break;
			case 2:
				completed = checkStep2();
				break;
			case 3:
				completed = checkStep3();
				break;
		}
		return completed;
	}

	function checkStep1() {
		let isValid = true;
		if (
			!nome ||
			!email ||
			// Removido tipoCadastro da validação
			!nomeEntidade ||
			!segmento ||
			nome === '' ||
			email === '' ||
			nomeEntidade === '' ||
			segmento === '' ||
			!email.includes('@')
		) {
			isValid = false;
		}

		if (is_chapa && !nomeChapa) {
			isValid = false;
		}
		return isValid;
	}

	function checkStep2() {
		return anexoPath !== '';
	}

	function checkStep3() {
		return termos;
	}

	return (
		<div className='container mx-auto h-full min-h-screen flex items-center justify-center'>
			<div className='max-w-3xl w-full mx-auto '>
				<form onSubmit={handleSubmit}>
					<Stepper
						initialStep={initialStep}
						onStepChange={(currentStep) => setStep(currentStep)}
						backButtonText='Voltar'
						nextButtonText='Próximo'
						completeButtonText='Finalizar'
						disableStepIndicators={true}
						stepCircleContainerClassName='w-full'
						contentClassName='my-6'
						final={<Finalizado />}
						submitButton={<Submit />}
						disableNextButton={false}
					>
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
									{/* Removido o input de tipoCadastro */}
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
											onValueChange={(value: Segmento) => setSegmento(value)}
											value={segmento}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Selecione o segmento' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Segmentos</SelectLabel>
													{Object.values(Segmento).map((seg) => (
														<SelectItem key={seg} value={seg}>
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

						<Step>
							<div className='col-span-4 flex flex-col gap-3'>
								<div className='leading-none font-semibold'>Anexo da Inscrição</div>
								<span className='text-muted-foreground'>
									Faça o upload do documento principal da sua inscrição (ex: PDF com a proposta).
								</span>
								<DragDropInput
									multiple={false}
									maxSize={50 * 1024 * 1024}
									accept='.pdf,.doc,.docx'
									helperText='Máximo 50MB. Somente PDF, DOC, DOCX.'
									onChange={async (files) => {
										if (files.length > 0) {
											const fileToUpload = files[0];
											const uploadFormData = new FormData();
											uploadFormData.append('file', fileToUpload);

											try {
												const uploadRes = await fetch(
													`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/upload`,
													{
														method: 'POST',
														body: uploadFormData,
													}
												);

												if (uploadRes.ok) {
													const uploadData = await uploadRes.json();
													setAnexoPath(uploadData.anexoPath);
													toast.success('Anexo enviado com sucesso!');
												} else {
													const errorUploadData = await uploadRes.json();
													toast.error(`Erro ao enviar anexo: ${errorUploadData.message || 'Tente novamente.'}`);
													setAnexoPath('');
												}
											} catch (error) {
												console.error('Erro de rede ao enviar anexo:', error);
												toast.error('Erro de rede ao enviar anexo. Verifique sua conexão.');
												setAnexoPath('');
											}
										} else {
											setAnexoPath('');
										}
									}}
									value={anexoPath ? [{ name: anexoPath } as File] : []}
								/>
							</div>
						</Step>

						<Step>
							<Finalizado />
						</Step>
					</Stepper>
				</form>
				<ModalConcluido
					open={open}
					protocolo={protocolo}
					onClose={handleClose}
				/>
			</div>
		</div>
	);
}
