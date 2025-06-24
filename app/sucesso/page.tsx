/** @format */

import Image from 'next/image';
import arch from '../../public/Architect-rafiki.png';

export default async function SucessoPage() {
	return (
		<>
			<div className='relative w-full h-full flex flex-col-reverse lg:flex-row items-center min-h-screen justify-center px-4 text-center mb-2 gap-10 2xl:gap-20'>
				<div className='h-auto w-fit'>
					<Image
						src={arch}
						alt='background sucesso de inscrição'
						className='object-contain inset-0'
						priority
						quality={100}
						width={300}
						height={200}
					/>
				</div>
				<div className='h-auto w-fit mt-10 md:mt-0'>
					<h1 className='text-4xl text-primary md:text-5xl font-bold mb-4 capitalize'>
						Inscrição realizada com sucesso!
					</h1>
					<p className='intersect-once intersect:motion-preset-slide-up motion-delay-200 text-lg text-secondary-foreground md:text-xl max-w-2xl mb-6'>
						Os dados desta inscrição e informações sobre as próximas etapas do
						concurso serão enviadas para o e-mail informado no ato de inscrição
					</p>
				</div>
			</div>
		</>
	);
}
