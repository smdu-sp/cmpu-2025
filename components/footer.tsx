/** @format */

import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo-footer.png';
import { Button } from './ui/button';

export default function Footer() {
	return (
		<footer
			id='contact'
			className='bg-primary dark:bg-zinc-800 text-white py-8 mt-auto bottom-0'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-4 items-end gap-8'>
					<div>
						<Image
							src={logo}
							alt='Brasão da Prefeitura de São Paulo'
							width={140}
							height={60}
							quality={100}
							className='mb-3'
						/>

						<p className='text-sm'>
							Secretaria Municipal de Urbanismo e Licenciamento
							<br />
							Rua São Bento, 405 - Centro
							<br />
							São Paulo - SP, 01011-100
						</p>
					</div>
					<div>
						{/* <div className='flex flex-col items-start gap-2 mb-4'>
							<Image
								src={logo}
								alt='Brasão da Prefeitura de São Paulo'
								width={400}
								height={80}
								className='w-28'
							/>
							<span className='font-semibold'>São Paulo Urbanismo</span>
						</div> */}
						<p className='text-sm mt-auto'>
							São Paulo Urbanismo
							<br />
							Rua São Bento, 405 - Centro
							<br />
							São Paulo - SP, 01011-100
						</p>
					</div>

					<div>
						<h3 className='font-semibold mb-4'>Links Úteis</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									href='https://capital.sp.gov.br/'
									target='_blank'
									className='hover:underline'>
									Portal da Prefeitura
								</Link>
							</li>
							<li>
								<Link
									href='https://capital.sp.gov.br/web/licenciamento'
									target='_blank'
									className='hover:underline'>
									Secretaria de Urbanismo e Licenciamento
								</Link>
							</li>
							<li>
								<Link
									href='https://capital.sp.gov.br/web/sp_urbanismo'
									target='_blank'
									className='hover:underline'>
									São Paulo Urbanismo
								</Link>
							</li>
							<li>
								<Link
									href='https://storyset.com/software'
									target='_blank'
									className='hover:underline'>
									Software illustrations by Storyset
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold mb-4'>Contato</h3>
						<ul className='space-y-2 text-sm'>
							<li>Telefone: (11) 3333-4444</li>
							<li>E-mail: festival@prefeitura.sp.gov.br</li>
						</ul>
						<div className='flex gap-3 mt-4'>
							<Button
								variant='ghost'
								size='sm'
								className='h-8 w-8 p-0 rounded-full'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<rect
										width='20'
										height='20'
										x='2'
										y='2'
										rx='5'
										ry='5'
									/>
									<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
									<line
										x1='17.5'
										x2='17.51'
										y1='6.5'
										y2='6.5'
									/>
								</svg>
							</Button>
							<Button
								variant='ghost'
								size='sm'
								className='h-8 w-8 p-0 rounded-full'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
								</svg>
							</Button>
							<Button
								variant='ghost'
								size='sm'
								className='h-8 w-8 p-0 rounded-full'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
								</svg>
							</Button>
							<Button
								variant='ghost'
								size='sm'
								className='h-8 w-8 p-0 rounded-full'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<path d='M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17' />
									<path d='m10 15 5-3-5-3z' />
								</svg>
							</Button>
						</div>
					</div>
				</div>

				<div className='border-t border-white/20 mt-8 pt-6 text-center text-sm'>
					<p>© 2025 Prefeitura de São Paulo. Todos os direitos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
