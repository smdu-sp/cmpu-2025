/** @format */

import Sair from '@/app/_components/Sair';
import { auth } from '@/auth';
import { ToggleTheme } from '@/components/toggle-theme';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo-final-eleicao-CMPU_300x200.png';
import UserLogged from './user-logged';

export default async function Navbar() {
	const session = await auth();
	return (
		<header className='bg-primary dark:bg-zinc-800 text-white'>
			<div className='container mx-auto px-4 py-3 flex items-center justify-between'>
				<Link href={'/'}>
					<Image
						src={logo}
						alt='Brasão da Prefeitura de São Paulo'
						width={100}
						height={60}
						quality={100}
					/>
				</Link>
				<nav className='hidden md:flex gap-6'>
					<Link
						href='/'
						className='text-sm hover:underline'>
						Início
					</Link>
					<a
						href='#info'
						className='text-sm hover:underline'>
						Informações
					</a>
					<Link
						href='https://prefeitura.sp.gov.br/licenciamento/desenvolvimento_urbano/participacao_social/conselhos_e_orgaos_colegiados/cmpu/'
						className='text-sm hover:underline'>
						Edital
					</Link>

					<Link
						href='https://prefeitura.sp.gov.br/licenciamento/desenvolvimento_urbano/participacao_social/conselhos_e_orgaos_colegiados/cmpu/'
						className='text-sm hover:underline'>
						Sobre o CMPU
					</Link>
				</nav>
				{/* <Button
							variant='outline'
							size='sm'
							className='border-white text-white hover:bg-white hover:text-[#0066CC]'>
							Acessibilidade
						</Button> */}
				<div className='flex items-center gap-5'>
					<UserLogged />
					<ToggleTheme />
					{session?.user?.nome}
					<Sair session={session} />
				</div>
			</div>
		</header>
	);
}
