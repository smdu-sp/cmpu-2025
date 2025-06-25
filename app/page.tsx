/** @format */

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Info, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import hero from '../public/hero-image.jpg';
import termo from '../public/Documents-rafiki.png';
import edital from '../public/Checklist-rafiki.png';
import banner from '../public/banner-02.jpg'

export default async function Home() {
	return (
		<div className='grid w-full  h-full '>
			<div className='flex h-full flex-col '>
				{/* Banner do evento */}
				<div className='relative h-full  w-full'>
					<Image
						src={banner}
						alt='Imagem da eleição'
						className='object-cover h-[680px]'
						priority
					/>
					<div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center p-4'>
						<span className=' bg-primary/90 px-4 py-1 rounded-full text-sm font-medium mb-10'>
							27 de Setembr de 2025, das 9h ás 17h
						</span>
						<h1 className='intersect:motion-preset-slide-up motion-delay-150 text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4 max-w-4xl'>
							Eleição do Conselho Municipal de Política Urbana
						</h1>
						<p className=' intersect:motion-preset-slide-up motion-delay-200 text-lg md:text-xl max-w-2xl mb-6 italic'>
							Participe com seu voto
						</p>
						<Link
							href={'/inscricao'}
							className=' intersect:motion-preset-slide-up motion-delay-400'>
							<Button
								size={'lg'}
								className='text-lg'>
								Inscreva-se Agora
							</Button>
						</Link>
					</div>
				</div>

				{/* Conteúdo principal com acordeões */}
				<main
					id='info'
					className='container h-full mx-auto px-4 py-10'>
					<h2 className='intersect:motion-preset-slide-up motion-delay-150 text-2xl md:text-3xl font-semibold text-center mb-8 text-primary uppercase'>
						Informações do Concurso
					</h2>

					<Accordion
						type='single'
						collapsible
						defaultValue='item-1'
						className='w-full max-w-3xl mx-auto space-y-4'>
						<AccordionItem
							value='item-1'
							className='border rounded-lg px-4 intersect:motion-preset-slide-up motion-delay-150'>
							<AccordionTrigger className='py-4 flex gap-3 items-center'>
								<div className=' flex items-center w-full'>
									<Info className='h-5 w-5 text-primary flex-shrink-0 col-span-0' />
									<p className='font-medium w-full text-center'>
										Sobre a eleição
									</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className='pb-4 pt-1 px-9'>
								<p className='text-muted-foreground'>
									O Conselho Municipal de Política Urbana – CMPU é o maior órgão colegiado da Secretaria
									Municipal de Urbanismo e Licenciamento (SMUL), tendo como objetivo acompanhar a execução
									da Política de Desenvolvimento Urbano do Município, discutir e elaborar propostas de
									projetos de lei de interesse urbanístico, debater diretrizes para as áreas públicas municipais,
									entre outras atribuições legais.
								</p>
								<p className='text-muted-foreground mt-3'>
									O CMPU é regulamentado pela própria lei do Plano Diretor Estratégico (PDE), sendo composto
									por 60 Conselheiros(as) titulares e respectivos(as) suplentes. São 26 representantes do Poder
									Público e 34 da sociedade civil – organizados por segmentos, com direito a voz e voto.
								</p>
								<p className='text-muted-foreground mt-3'>
									As 34 vagas destinadas à sociedade civil são distribuídas da seguinte forma:
									12 para membros integrantes de outros conselhos e 22 para membros de diversos
									segmentos que devem ser escolhidos a cada dois anos por meio de eleição,
									o que acontece mais uma vez agora em 2023.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value='item-2'
							className='border rounded-lg px-4 intersect:motion-preset-slide-up motion-delay-200'>
							<AccordionTrigger className='py-4 flex gap-3 items-center'>
								<div className=' flex items-center w-full'>
									<Calendar className='h-5 w-5 text-primary flex-shrink-0' />
									<p className='font-medium w-full text-center'>
										Data da Votação
									</p>
								</div>
								<span className='font-medium'></span>
							</AccordionTrigger>
							<AccordionContent className='pb-4 pt-1 px-9'>
								<div className='space-y-3'>
									<p className='text-gray-700 dark:text-gray-300'>
										<strong>Data:</strong> 24 de Setembro de 2025
									</p>
									<p className='text-gray-700 dark:text-gray-300'>
										<strong>Horários:</strong>
									</p>
									<ul className='list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1'>
										<li>Das 9h às 17h</li>
									</ul>
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value='item-4'
							className='border rounded-lg px-4 intersect:motion-preset-slide-up motion-delay-300'>
							<AccordionTrigger className='py-4 flex gap-3 items-center'>
								<div className=' flex items-center w-full'>
									<Clock className='h-5 w-5 text-primary flex-shrink-0' />
									<p className='font-medium w-full text-center'>Locais de Votação</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className='pb-4 pt-1 px-9'>
								<div className='space-y-4'>
									<div>
										<li className='flex gap-2'>
											<span className='text-gray-700 dark:text-gray-300'>
												<Link
													href={"https://gestaourbana.prefeitura.sp.gov.br/wp-content/uploads/2023/08/SMUL-Locais-CMPU-gestao-urbana_compressed-2.pdf"}
												>
													Clique aqui para visualizar as zonas eleitorais de cada subprefeitura
												</Link>
											</span>
										</li>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value='item-6'
							className='border rounded-lg px-4 intersect:motion-preset-slide-up motion-delay-700'>
							<AccordionTrigger className='py-4 flex gap-3 items-center'>
								<div className=' flex items-center w-full'>
									<Phone className='h-5 w-5 text-primary flex-shrink-0' />
									<p className='font-medium w-full text-center'>Quem poderá votar?</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className='pb-4 pt-1 px-9'>
								<div className='space-y-4'>
									<div>
										Nos locais poderá votar qualquer cidadão acompanhado de título eleitoral com situação regular e de documento oficial de identificação original com foto.Não serão aceitos títulos de eleitor que não sejam de São Paulo. Cada eleitor votará em um único segmento e terá direito a um único voto.
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
						{/* <AccordionItem
							value='item-7'
							className='border rounded-lg px-4 z-50 intersect:motion-preset-slide-up motion-delay-700'>
							<AccordionTrigger className='py-4 flex gap-3 items-center'>
								<div className=' flex items-center w-full'>
									<HelpCircle className='h-5 w-5 text-primary flex-shrink-0' />
									<p className='font-medium w-full text-center'>
										Perguntas Frequentes
									</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className='px-9 pb-4 pt-1'>
								<div className='flex flex-col gap-4'>
									<div>
										<h4 className='font-semibold'>O evento é gratuito?</h4>
										<p className='mt-1 text-gray-700 dark:text-gray-300'>
											Sim, a entrada no evento é gratuita. Algumas atividades
											específicas podem requerer inscrição prévia devido à
											capacidade limitada.
										</p>
									</div>

									<div>
										<h4 className='font-semibold'>Posso levar crianças?</h4>
										<p className='mt-1 text-gray-700 dark:text-gray-300'>
											Sim! O evento é para todas as idades e conta com
											programação específica para crianças. Menores de 12 anos
											devem estar acompanhados por um responsável.
										</p>
									</div>

									<div>
										<h4 className='font-semibold'>
											É permitido levar comida e bebida?
										</h4>
										<p className='mt-1 text-gray-700 dark:text-gray-300'>
											É permitido levar água e lanches leves. O evento contará
											com praça de alimentação com diversas opções
											gastronômicas.
										</p>
									</div>

									<div>
										<h4 className='font-semibold'>
											Haverá acessibilidade para pessoas com deficiência?
										</h4>
										<p className='mt-1 text-gray-700 dark:text-gray-300'>
											Sim, todas as áreas do evento contam com acessibilidade.
											Haverá intérpretes de Libras nas principais apresentações
											e material em Braille disponível nos postos de informação.
										</p>
									</div>

									<div>
										<h4 className='font-semibold'>
											Posso levar animais de estimação?
										</h4>
										<p className='mt-1 text-gray-700 dark:text-gray-300'>
											Animais de estimação são permitidos, desde que estejam com
											coleira e sob responsabilidade do dono. Cães-guia têm
											acesso garantido a todas as áreas.
										</p>
									</div>

									<div>
										<h4 className='font-semibold'>
											O que não é permitido levar?
										</h4>
										<p className='mt-1 text-gray-700 dark:text-gray-300'>
											Não é permitido levar objetos cortantes, garrafas de
											vidro, bebidas alcoólicas, drones ou equipamentos
											profissionais de fotografia (sem credenciamento).
										</p>
									</div>

									<div>
										<h4 className='font-semibold'>
											Em caso de chuva, o evento será cancelado?
										</h4>
										<p className='mt-1 text-gray-700 dark:text-gray-300'>
											Não. As atividades ao ar livre podem ser remanejadas para
											áreas cobertas ou ter seus horários alterados. Acompanhe
											as redes sociais para informações atualizadas.
										</p>
									</div>

									<div>
										<h4 className='font-semibold'>Haverá estacionamento?</h4>
										<p className='mt-1 text-gray-700 dark:text-gray-300'>
											Sim, o estacionamento do parque estará disponível, mas com
											capacidade limitada e taxa de utilização. Recomendamos o
											uso de transporte público.
										</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem> */}
					</Accordion>
				</main>

			</div>
		</div>
	);
}
