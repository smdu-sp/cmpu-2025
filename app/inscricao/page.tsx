/** @format */

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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	formatarCEP,
	formatarCNPJ,
	formatarCPF,
	formatarTelefone,
	formataUF,
} from '@/lib/utils';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, startTransition, useState } from 'react';
import { toast } from 'sonner';
import { ViaCepResposta } from '../api/buscar-cep/[cep]/cep.dto';
import { IParticipante } from '../api/cadastro/cadastro.dto';
import ModalConcluido from './_components/modal-concluido';

export default function Inscricao() {
	const initialStep = 1;
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(initialStep);
	const [protocolo, setProtocolo] = useState('');
	const router = useRouter();
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [telefone, setTelefone] = useState('');
	const [cpf, setCpf] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [carteira_tipo, setCarteira_tipo] = useState('CAU');
	const [carteira_numero, setCarteira_numero] = useState('');
	const [equipe, setEquipe] = useState(false);
	const [cep, setCep] = useState('');
	const [uf, setUf] = useState('');
	const [cidade, setCidade] = useState('');
	const [logradouro, setLogradouro] = useState('');
	const [numero, setNumero] = useState('');
	const [complemento, setComplemento] = useState('');
	const [doc_especifica, setDoc_especifica] = useState<File[]>([]);
	const [projetos, setProjetos] = useState<File[]>([]);
	const [termos, setTermos] = useState(false);
	const [envioUnico, setEnvioUnico] = useState(false);
	const [participantes, setParticipantes] = useState<IParticipante[]>([]);
	const [participanteNome, setParticipanteNome] = useState('');
	const [participanteDocumento, setParticipanteDocumento] = useState('');

	function Finalizado() {
		return (
			<div className='flex flex-col p-2 px-8 md:px-16 md:py-4'>
				<h2 className='text-lg mb-2'>Responsável pelo projeto</h2>
				<div className='flex flex-col gap-2 text-muted-foreground'>
					<p>{nome}</p>
					<p>{email}</p>
					<p>{telefone}</p>
					<p>{cpf}</p>
					<p>{cnpj}</p>
					{carteira_numero && (
						<p>
							{carteira_tipo} - {carteira_numero}
						</p>
					)}
				</div>
				<Separator className='my-4' />
				<h2 className='text-lg mb-2'>Endereço</h2>
				<div className='flex flex-col gap-2 text-muted-foreground'>
					<p>{cep}</p>
					<p>
						{logradouro}
						{numero && `, ${numero}`}
						{complemento && ` - ${complemento}`}
					</p>
					<p>
						{cidade} - {uf}
					</p>
				</div>
				<Separator className='my-4' />
				<h2 className='text-lg mb-2'>Documentos enviados</h2>
				<div className='flex flex-col gap-2 text-muted-foreground'>
					<p>
						Documentos de inscrição: {doc_especifica.length} arquivo
						{doc_especifica.length > 1 && 's'}
					</p>
					<p>
						Projetos: {projetos.length} arquivo{projetos.length > 1 && 's'}
					</p>
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

	function handleSubmit(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		event?: BaseSyntheticEvent<object, any, any> | undefined,
	) {
		event?.preventDefault();
		const formData = new FormData();
		formData.append('nome', nome);
		formData.append('email', email);
		formData.append('telefone', telefone);
		formData.append('cpf', cpf);
		formData.append('cnpj', cnpj);
		formData.append('carteira_tipo', carteira_tipo);
		formData.append('carteira_numero', carteira_numero);
		formData.append('equipe', equipe.toString());
		formData.append('cep', cep);
		formData.append('logradouro', logradouro);
		formData.append('cidade', cidade);
		formData.append('uf', uf);
		if (numero) formData.append('numero', numero);
		if (complemento) formData.append('complemento', complemento);
		for (let x = 0; x < doc_especifica.length; x++)
			formData.append('doc_especifica', doc_especifica[x]);
		for (let x = 0; x < projetos.length; x++)
			formData.append('projetos', projetos[x]);
		formData.append('participantes', JSON.stringify(participantes));
		startTransition(async () => {
			const res = await fetch(
				`${process.env.BASE_URL || 'http://localhost:3000'}/api/cadastro`,
				{
					method: 'POST',
					body: formData,
				},
			);
			if (res.status === 201) {
				const data = await res.json();
				setProtocolo(data.protocolo);
				setOpen(true);
			} else {
				toast.error('Erro ao enviar inscrição. Tente novamente.');
			}
		});
	}

	function handleClose() {
		router.push('/sucesso');
		setOpen(false);
	}

	async function buscaCEP(cep: string) {
		cep = cep.replace(/\D/g, '').trim().substring(0, 8);
		if (cep.length === 8) {
			try {
				const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
				const data: ViaCepResposta = await response.json();
				setUf(data.uf ? data.uf : '');
				setCidade(data.localidade ? data.localidade : '');
				setLogradouro(data.logradouro ? data.logradouro : '');
			} catch (error) {
				console.error('Erro ao buscar CEP:', error);
			}
		}
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
			case 4:
				completed = checkStep4();
				break;
			case 5:
				completed = checkStep5();
				break;
			case 6:
				completed = checkStep6();
				break;
		}
		return completed;
	}

	function checkStep1() {
		return envioUnico;
	}

	function checkStep2() {
		let step2 = true;
		if (
			!nome ||
			!email ||
			!telefone ||
			!cpf ||
			!cnpj ||
			!carteira_tipo ||
			!carteira_numero ||
			nome === '' ||
			email === '' ||
			telefone === '' ||
			cpf === '' ||
			cnpj === '' ||
			carteira_numero === '' ||
			nome.length < 3 ||
			!email.includes('@') ||
			telefone.length < 14 ||
			cpf.length < 14 ||
			cnpj.length < 18
		)
			step2 = false;
		return step2;
	}

	function checkStep3() {
		let step3 = true;
		if (equipe) step3 = validaEquipe();
		if (!equipe) step3 = validaEndereco();
		return step3;
	}

	function checkStep4() {
		let step4 = true;
		if (equipe) step4 = validaEndereco();
		if (!equipe) step4 = doc_especifica.length > 0;
		return step4;
	}

	function checkStep5() {
		let step5 = true;
		if (equipe) step5 = doc_especifica.length > 0;
		if (!equipe) step5 = projetos.length > 0;
		return step5;
	}

	function checkStep6() {
		return projetos.length > 0;
	}

	function validaEndereco() {
		let valida = true;
		if (
			!cep ||
			!logradouro ||
			!cidade ||
			!uf ||
			cep === '' ||
			logradouro === '' ||
			cidade === '' ||
			uf === '' ||
			uf.length !== 2 ||
			cep.length !== 9
		)
			valida = false;
		return valida;
	}

	function validaEquipe() {
		let valida = true;
		valida = participantes.length > 0;
		return valida;
	}

	function adicionarParticipante() {
		setParticipantes([
			...participantes,
			{ nome: participanteNome, documento: participanteDocumento },
		]);
		setParticipanteNome('');
		setParticipanteDocumento('');
	}

	function removerParticipante(index: number): void {
		const newParticipantes = [...participantes];
		newParticipantes.splice(index, 1);
		setParticipantes(newParticipantes);
	}

	return (
		<div className='container mx-auto h-full min-h-screen flex items-center justify-center'>
			<div className='max-w-3xl w-full mx-auto '>
				<form onSubmit={handleSubmit}>
					<Stepper
						initialStep={initialStep}
						onStepChange={(step) => setStep(step)}
						backButtonText='Voltar'
						nextButtonText='Próximo'
						completeButtonText='Finalizar'
						disableStepIndicators={true}
						stepCircleContainerClassName='w-full'
						contentClassName='my-6'
						final={<Finalizado />}
						submitButton={<Submit />}
						disableNextButton={false}>
						<Step>
							<div className='flex flex-col gap-4'>
								<h2>Instruções sobre o envio dos dados</h2>
								<span className='text-muted-foreground'>
									Preencha os campos abaixo com os dados pessoais e
									empresariais. Os arquivos de inscrição e projetos devem ser
									anexados ao formulário.
								</span>
								<span className='font-bold'>
									O ENVIO É UNICO, NÃO SERÁ POSSÍVEL ALTERAR OS DADOS ENVIADOS.
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
						<Step>
							<div className='flex flex-col gap-4'>
								<div className='grid grid-cols-4 gap-6'>
									<div className='col-span-4 md:col-span-4 flex flex-col gap-3'>
										<Label>Nome</Label>
										<Input
											placeholder='Nome do responsável pelo projeto'
											name='nome'
											value={nome}
											onChange={(e) => setNome(e.target.value)}
										/>
									</div>
									<div className='col-span-4 md:col-span-2 flex flex-col gap-3'>
										<Label>CPF</Label>
										<Input
											placeholder='000.000.000-00'
											name='cpf'
											value={cpf}
											onChange={(e) => setCpf(formatarCPF(e.target.value))}
										/>
									</div>
									<div className='col-span-4 md:col-span-2 flex flex-col gap-3'>
										<Label>CNPJ</Label>
										<Input
											placeholder='00.000.0000/0000-00'
											name='cnpj'
											value={cnpj}
											onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
										/>
									</div>
									<div className='col-span-4 md:col-span-2 flex flex-col gap-3'>
										<Label>Email</Label>
										<Input
											placeholder='exemplo@email.com'
											name='email'
											type='email'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className='col-span-4 md:col-span-2 flex flex-col gap-3'>
										<Label>Telefone</Label>
										<Input
											placeholder='(00) 90000-0000'
											name='telefone'
											value={telefone}
											onChange={(e) =>
												setTelefone(formatarTelefone(e.target.value))
											}
										/>
									</div>
									<div className='col-span-4 md:col-span-1 flex flex-col gap-3'>
										<Label>CAU/CREA</Label>
										<Select
											onValueChange={setCarteira_tipo}
											defaultValue={carteira_tipo}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Selecione o tipo' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Tipo</SelectLabel>
													<SelectItem value='CAU'>CAU</SelectItem>
													<SelectItem value='CREA'>CREA</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
									<div className='col-span-4 md:col-span-3 flex flex-col gap-3'>
										<Label>Número de identificação</Label>
										<Input
											placeholder={
												carteira_tipo === 'CAU' ? 'A000000-0' : '0000000000'
											}
											name='carteira_numero'
											value={carteira_numero}
											onChange={(e) => setCarteira_numero(e.target.value)}
										/>
									</div>
									<div className='col-span-4 md:col-span-4 gap-1 flex items-center space-x-2'>
										<Checkbox
											name='equipe'
											onCheckedChange={(checked) =>
												setEquipe(checked as boolean)
											}
											checked={equipe}
										/>
										<Label
											className='cursor-pointer'
											onClick={() => setEquipe(!equipe)}>
											Essa inscrição representa uma equipe.
										</Label>
									</div>
								</div>
							</div>
						</Step>
						{equipe && (
							<Step>
								<div className='flex flex-col gap-4'>
									<div className='grid grid-cols-6 gap-3 items-end'>
										<div className='col-span-6 rounded overflow-hidden'>
											<Table>
												<TableHeader>
													<TableRow className='bg-primary hover:bg-primary'>
														<TableHead colSpan={3}>
															<div className='grid grid-cols-10 gap-1 w-full text-primary-foreground'>
																<div className='col-span-5'>Nome</div>
																<div className='col-span-4'>Documento</div>
																<div className='col-span-1'></div>
															</div>
														</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													<TableRow>
														<TableCell colSpan={3}>
															<div className='grid grid-cols-10 gap-3 sm:gap-1 w-full'>
																<Input
																	className='col-span-10 sm:col-span-5'
																	placeholder='Nome do participante (empresa/pessoa física)'
																	name='participanteNome'
																	value={participanteNome}
																	onChange={(e) =>
																		setParticipanteNome(e.target.value)
																	}
																/>
																<Input
																	className='col-span-10 sm:col-span-4'
																	placeholder='CPF/CNPJ'
																	name='participanteDocumento'
																	value={participanteDocumento}
																	onChange={(e) =>
																		setParticipanteDocumento(
																			formatarCPF(e.target.value),
																		)
																	}
																/>
																<Button
																	className='col-span-10 mt-2 sm:mt-0 sm:col-span-1'
																	type='button'
																	onClick={() => adicionarParticipante()}>
																	<Plus />
																</Button>
															</div>
														</TableCell>
													</TableRow>
													{participantes.map((participante, index) => (
														<TableRow key={index}>
															<TableCell colSpan={3}>
																<div className='grid grid-cols-10 gap-1 w-full items-center'>
																	<div className='col-span-5'>
																		{participante.nome}
																	</div>
																	<div className='col-span-4'>
																		{participante.documento}
																	</div>
																	<Button
																		type='button'
																		variant='link'
																		className='col-span-1 rounded-full text-destructive'
																		onClick={() => removerParticipante(index)}>
																		<X />
																	</Button>
																</div>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</div>
									</div>
								</div>
							</Step>
						)}
						<Step>
							<div className='grid grid-cols-4 gap-6'>
								<div className='col-span-4 md:col-span-4 flex flex-col gap-3'>
									<Label>CEP</Label>
									<Input
										name='cep'
										placeholder='00000-000'
										value={cep}
										onBlur={(e) => buscaCEP(e.target.value)}
										onChange={(e) => {
											setCep(formatarCEP(e.target.value));
											setLogradouro('');
											setCidade('');
											setUf('');
										}}
									/>
								</div>
								<div className='col-span-4 md:col-span-1 flex flex-col gap-3'>
									<Label>Estado</Label>
									<Input
										disabled
										placeholder='UF'
										value={uf}
										className='disabled:opacity-100'
										onChange={(e) => setUf(formataUF(e.target.value))}
										readOnly
									/>
								</div>
								<div className='col-span-4 md:col-span-3 flex flex-col gap-3'>
									<Label>Cidade</Label>
									<Input
										disabled
										placeholder='Cidade'
										name='cidade'
										className='disabled:opacity-100'
										value={cidade}
										onChange={(e) => setCidade(e.target.value)}
										readOnly
									/>
								</div>
								<div className='col-span-4 md:col-span-3 flex flex-col gap-3'>
									<Label>Logradouro</Label>
									<Input
										disabled
										placeholder='Logradouro'
										className='disabled:opacity-100'
										name='logradouro'
										value={logradouro}
										onChange={(e) => setLogradouro(e.target.value)}
										readOnly
									/>
								</div>
								<div className='col-span-4 md:col-span-1 flex flex-col gap-3'>
									<Label>Número</Label>
									<Input
										placeholder='Número'
										name='numero'
										value={numero}
										onChange={(e) => setNumero(e.target.value)}
									/>
								</div>
								<div className='col-span-4 md:col-span-4 flex flex-col gap-3'>
									<Label>Complemento</Label>
									<Input
										placeholder='Complemento'
										name='complemento'
										value={complemento}
										onChange={(e) => setComplemento(e.target.value)}
									/>
								</div>
							</div>
						</Step>
						<Step>
							<div className='col-span-4 md:col-span-4 flex flex-col gap-3'>
								<div className='leading-none font-semibold'>Documentação</div>
								<DragDropInput
									multiple={true}
									maxSize={20 * 1024 * 1024}
									accept='image/*,.pdf,.doc,.docx'
									helperText='Máximo 20MB total.'
									onChange={setDoc_especifica}
									value={doc_especifica}
								/>
							</div>
						</Step>
						<Step>
							<div className='col-span-4 md:col-span-4 flex flex-col gap-3'>
								<div className='leading-none font-semibold'>Projetos</div>
								<DragDropInput
									multiple={true}
									maxSize={130 * 1024 * 1024}
									accept='image/*,.pdf,.doc,.docx'
									helperText='Máximo 130MB total.'
									onChange={setProjetos}
									value={projetos}
								/>
							</div>
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
