/** @format */

'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import type {
	CriteriaDefinition,
	EvaluationCriteria,
	EvaluationDialogProps,
	FinalDecision,
	Participant,
	ParticipantStatus,
	StatusConfigMap,
} from '@/types/evaluation';
import {
	AlertCircle,
	CheckCircle,
	Clock,
	Download,
	Edit,
	Eye,
	FileText,
	UserCheck,
	XCircle,
} from 'lucide-react';
import { useState } from 'react';

// Mock data for participants
const participants: Participant[] = [
	{
		id: 1,
		name: 'Ana Silva Santos',
		email: 'ana.silva@email.com',
		submissionDate: '2024-01-15',
		status: 'pending',
		documents: [
			'Currículo.pdf',
			'Comprovante de Escolaridade.pdf',
			'Documento de Identidade.pdf',
		],
		evaluation: {
			documentationComplete: null,
			meetsRequirements: null,
			eligibilityConfirmed: null,
			regulationsCompliance: null,
		},
		comments: '',
		finalDecision: null,
	},
	{
		id: 2,
		name: 'Carlos Eduardo Lima',
		email: 'carlos.lima@email.com',
		submissionDate: '2024-01-14',
		status: 'approved',
		documents: ['CV_Carlos.pdf', 'Diploma_Graduacao.pdf', 'RG.pdf', 'CPF.pdf'],
		evaluation: {
			documentationComplete: true,
			meetsRequirements: true,
			eligibilityConfirmed: true,
			regulationsCompliance: true,
		},
		comments:
			'Candidato atende todos os requisitos. Documentação completa e em conformidade.',
		finalDecision: 'approved',
	},
	{
		id: 3,
		name: 'Maria Fernanda Costa',
		email: 'maria.costa@email.com',
		submissionDate: '2024-01-16',
		status: 'under_review',
		documents: ['Curriculo_Maria.pdf', 'Certificado_Incompleto.pdf'],
		evaluation: {
			documentationComplete: false,
			meetsRequirements: true,
			eligibilityConfirmed: true,
			regulationsCompliance: null,
		},
		comments:
			'Documentação incompleta. Aguardando envio de comprovante de escolaridade.',
		finalDecision: null,
	},
	{
		id: 4,
		name: 'João Pedro Oliveira',
		email: 'joao.oliveira@email.com',
		submissionDate: '2024-01-13',
		status: 'rejected',
		documents: ['Resume.pdf', 'Certificado_Ensino_Medio.pdf'],
		evaluation: {
			documentationComplete: true,
			meetsRequirements: false,
			eligibilityConfirmed: false,
			regulationsCompliance: true,
		},
		comments:
			'Não atende aos requisitos mínimos de escolaridade para participação.',
		finalDecision: 'rejected',
	},
];

const evaluationCriteria: CriteriaDefinition[] = [
	{
		id: 'documentationComplete',
		name: 'Documentação Completa',
		description: 'Todos os documentos obrigatórios foram enviados',
	},
	{
		id: 'meetsRequirements',
		name: 'Requisitos Mínimos',
		description: 'Candidato atende aos requisitos mínimos de participação',
	},
	{
		id: 'eligibilityConfirmed',
		name: 'Elegibilidade Confirmada',
		description: 'Candidato está elegível para participar do concurso',
	},
	{
		id: 'regulationsCompliance',
		name: 'Conformidade com Regulamento',
		description: 'Documentos estão em conformidade com o regulamento',
	},
];

export default function Content(): JSX.Element {
	const [selectedParticipant, setSelectedParticipant] =
		useState<Participant | null>(null);
	const [filterStatus, setFilterStatus] = useState<string>('all');
	const [searchTerm, setSearchTerm] = useState<string>('');

	const getStatusBadge = (status: ParticipantStatus): JSX.Element => {
		const statusConfig: StatusConfigMap = {
			pending: {
				label: 'Pendente',
				variant: 'secondary',
				icon: Clock,
				className:
					'bg-yellow-100 dark:bg-yellow-800 dark:border-yellow-800 dark:text-yellow-100   text-yellow-800 border-yellow-200',
			},
			under_review: {
				label: 'Em Análise',
				variant: 'default',
				icon: Eye,
				className:
					'bg-blue-100 dark:bg-blue-800 dark:border-blue-800 dark:text-blue-100 text-blue-800 border-blue-200',
			},
			approved: {
				label: 'Aprovado',
				variant: 'default',
				icon: CheckCircle,
				className:
					'bg-green-100 dark:bg-green-800 dark:border-green-800  text-green-800 dark:text-green-100 border-green-200',
			},
			rejected: {
				label: 'Reprovado',
				variant: 'destructive',
				icon: XCircle,
				className:
					'bg-red-100 dark:bg-red-800 dark:border-red-800 dark:text-red-100 text-red-800 border-red-200',
			},
		};

		const config = statusConfig[status];
		const Icon = config.icon;

		return (
			<Badge className={`flex items-center gap-1 ${config.className}`}>
				<Icon className='w-3 h-3' />
				{config.label}
			</Badge>
		);
	};

	const filteredParticipants = participants.filter((participant) => {
		const matchesSearch =
			participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			participant.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			filterStatus === 'all' || participant.status === filterStatus;
		return matchesSearch && matchesStatus;
	});

	const EvaluationDialog = ({
		participant,
	}: EvaluationDialogProps): JSX.Element => {
		const [evaluation, setEvaluation] = useState<EvaluationCriteria>(
			participant?.evaluation || {
				documentationComplete: null,
				meetsRequirements: null,
				eligibilityConfirmed: null,
				regulationsCompliance: null,
			},
		);
		const [comments, setComments] = useState<string>(
			participant?.comments || '',
		);
		const [finalDecision, setFinalDecision] = useState<FinalDecision>(
			participant?.finalDecision || null,
		);

		const handleEvaluationChange = (
			criteriaId: keyof EvaluationCriteria,
			value: boolean | null,
		): void => {
			setEvaluation((prev) => ({ ...prev, [criteriaId]: value }));
		};

		const isApprovalReady = (): boolean => {
			return Object.values(evaluation).every((value) => value !== null);
		};

		if (!participant) return <></>;

		return (
			<DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='text-center'>
						Avaliar Aptidão - {participant.name}
					</DialogTitle>
					<DialogDescription className='text-balance text-center'>
						Avalie se o candidato está apto para participar da fase de envio de
						projetos.
					</DialogDescription>
				</DialogHeader>

				<Tabs
					defaultValue='documents'
					className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='documents'>Documentos</TabsTrigger>
						<TabsTrigger value='evaluation'>Avaliação de Aptidão</TabsTrigger>
					</TabsList>

					<TabsContent
						value='documents'
						className='space-y-4'>
						<div className='grid gap-4'>
							<div className='flex items-center gap-4 p-4 border rounded-lg'>
								<Avatar>
									<AvatarFallback>
										{participant.name
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</AvatarFallback>
								</Avatar>
								<div>
									<h3 className='font-semibold'>{participant.name}</h3>
									<p className='text-sm text-muted-foreground'>
										{participant.email}
									</p>
									<p className='text-sm text-muted-foreground'>
										Enviado em:{' '}
										{new Date(participant.submissionDate).toLocaleDateString(
											'pt-BR',
										)}
									</p>
								</div>
							</div>

							<div className='space-y-2'>
								<Label>Documentos Enviados</Label>
								<div className='grid gap-2'>
									{participant.documents.map((doc, index) => (
										<div
											key={index}
											className='flex items-center justify-between p-3 border rounded-lg'>
											<div className='flex items-center gap-2'>
												<FileText className='w-4 h-4' />
												<span className='text-sm'>{doc}</span>
											</div>
											<Button
												variant='outline'
												size='sm'>
												<Download className='w-4 h-4 mr-1' />
												Visualizar
											</Button>
										</div>
									))}
								</div>
							</div>
						</div>
					</TabsContent>

					<TabsContent
						value='evaluation'
						className='space-y-6'>
						<div className='grid gap-4'>
							<div className='space-y-4'>
								<Label className='text-base font-semibold'>
									Critérios de Aptidão
								</Label>
								{evaluationCriteria.map((criteria) => (
									<div
										key={criteria.id}
										className='space-y-3 p-4 border rounded-lg'>
										<div className='space-y-1'>
											<Label className='font-medium'>{criteria.name}</Label>
											<p className='text-sm text-muted-foreground'>
												{criteria.description}
											</p>
										</div>
										<div className='flex items-center gap-4'>
											<div className='flex items-center space-x-2'>
												<Switch
													id={`${criteria.id}-approved`}
													checked={evaluation[criteria.id] === true}
													onCheckedChange={(checked: boolean) =>
														handleEvaluationChange(
															criteria.id,
															checked ? true : null,
														)
													}
												/>
												<Label
													htmlFor={`${criteria.id}-approved`}
													className='text-sm text-green-700 font-medium'>
													Aprovado
												</Label>
											</div>
											<div className='flex items-center space-x-2'>
												<Switch
													className='data-[state=checked]:bg-red-700'
													id={`${criteria.id}-rejected`}
													checked={evaluation[criteria.id] === false}
													onCheckedChange={(checked: boolean) =>
														handleEvaluationChange(
															criteria.id,
															checked ? false : null,
														)
													}
												/>
												<Label
													htmlFor={`${criteria.id}-rejected`}
													className='text-sm text-red-700 font-medium'>
													Reprovado
												</Label>
											</div>
											{evaluation[criteria.id] === null && (
												<Badge
													variant='secondary'
													className='bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100'>
													<AlertCircle className='w-3 h-3 mr-1' />
													Pendente
												</Badge>
											)}
										</div>
									</div>
								))}
							</div>

							<div className='space-y-2'>
								<Label htmlFor='comments'>Observações e Justificativas</Label>
								<Textarea
									id='comments'
									placeholder='Adicione observações sobre a avaliação de aptidão...'
									value={comments}
									onChange={(e) => setComments(e.target.value)}
									rows={4}
								/>
							</div>

							{isApprovalReady() && (
								<Select
									value={finalDecision || undefined}
									onValueChange={(value: string) =>
										setFinalDecision(value as FinalDecision)
									}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Selecione a decisão final' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='approved'>
											<div className='flex items-center gap-2'>
												<CheckCircle className='w-4 h-4 text-green-600' />
												Aprovar para Fase de Projetos
											</div>
										</SelectItem>
										<SelectItem value='rejected'>
											<div className='flex items-center gap-2'>
												<XCircle className='w-4 h-4 text-red-600' />
												Reprovar Candidato
											</div>
										</SelectItem>
									</SelectContent>
								</Select>
							)}
						</div>
					</TabsContent>
				</Tabs>

				<DialogFooter>
					<Button
						className='w-full mt-5'
						disabled={!finalDecision}>
						<UserCheck className='w-4 h-4 mr-2' />
						Finalizar Avaliação
					</Button>
				</DialogFooter>
			</DialogContent>
		);
	};

	return (
		<div className='container mx-auto space-y-5'>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-3xl font-bold'>Avaliação de Aptidão</h1>
					<p className='text-muted-foreground mt-2'>
						Avalie se os candidatos estão aptos para participar da fase de envio
						de projetos
					</p>
				</div>
			</div>

			{/* Statistics Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between'>
						<CardTitle className='text-sm font-medium'>
							Total de Candidatos
						</CardTitle>
						<FileText className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{participants.length}</div>
					</CardContent>
				</Card>
				<Card className='border-green-200'>
					<CardHeader className='flex flex-row items-center justify-between'>
						<CardTitle className='text-sm font-medium text-green-700'>
							Aprovados
						</CardTitle>
						<CheckCircle className='h-4 w-4 text-green-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-green-700'>
							{participants.filter((p) => p.status === 'approved').length}
						</div>
					</CardContent>
				</Card>
				<Card className='border-red-200'>
					<CardHeader className='flex flex-row items-center justify-between'>
						<CardTitle className='text-sm font-medium text-red-700'>
							Reprovados
						</CardTitle>
						<XCircle className='h-4 w-4 text-red-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-red-700'>
							{participants.filter((p) => p.status === 'rejected').length}
						</div>
					</CardContent>
				</Card>
				<Card className='border-yellow-200'>
					<CardHeader className='flex flex-row items-center justify-between'>
						<CardTitle className='text-sm font-medium text-yellow-700'>
							Pendentes
						</CardTitle>
						<Clock className='h-4 w-4 text-yellow-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-yellow-700'>
							{
								participants.filter(
									(p) => p.status === 'pending' || p.status === 'under_review',
								).length
							}
						</div>
					</CardContent>
				</Card>
			</div>
			<Separator className='my-10 w-full' />

			{/* Filters */}

			<div className='flex gap-4 w-full items-end'>
				<div className='w-full flex flex-col gap-2'>
					<p className='font-semibold'>Buscar Candidato</p>
					<Input
						id='search'
						placeholder='Nome ou email...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<Select
					value={filterStatus}
					onValueChange={setFilterStatus}>
					<SelectTrigger className='w-60'>
						<SelectValue placeholder='Filtrar por status' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>Todos</SelectItem>
						<SelectItem value='pending'>Pendente</SelectItem>
						<SelectItem value='under_review'>Em Análise</SelectItem>
						<SelectItem value='approved'>Aprovado</SelectItem>
						<SelectItem value='rejected'>Reprovado</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Participants Table */}

			<Table className='border rounded-lg'>
				<TableHeader>
					<TableRow className='bg-secondary'>
						<TableHead>Candidato</TableHead>
						<TableHead>Data de Envio</TableHead>
						<TableHead>Documentos</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Observações</TableHead>
						<TableHead>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredParticipants.map((participant) => (
						<TableRow key={participant.id}>
							<TableCell>
								<div className='flex items-center gap-3'>
									<Avatar>
										<AvatarFallback>
											{participant.name
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</AvatarFallback>
									</Avatar>
									<div>
										<div className='font-medium'>{participant.name}</div>
										<div className='text-sm text-muted-foreground'>
											{participant.email}
										</div>
									</div>
								</div>
							</TableCell>
							<TableCell>
								{new Date(participant.submissionDate).toLocaleDateString(
									'pt-BR',
								)}
							</TableCell>
							<TableCell>
								<div className='flex items-center gap-1'>
									<FileText className='w-4 h-4' />
									{participant.documents.length} arquivo(s)
								</div>
							</TableCell>
							<TableCell>{getStatusBadge(participant.status)}</TableCell>
							<TableCell>
								<div className='max-w-xs truncate text-sm text-muted-foreground'>
									{participant.comments || '—'}
								</div>
							</TableCell>
							<TableCell>
								<Dialog>
									<DialogTrigger asChild>
										<Button
											variant='outline'
											size='sm'
											onClick={() => setSelectedParticipant(participant)}>
											<Edit className='w-4 h-4 mr-1' />
											Avaliar
										</Button>
									</DialogTrigger>
									<EvaluationDialog participant={selectedParticipant} />
								</Dialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
