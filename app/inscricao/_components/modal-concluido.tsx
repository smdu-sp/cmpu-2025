/** @format */

'use client';

import React from 'react';
import { DialogTitle, Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ModalConcluidoProps {
	open: boolean;
	protocolo: string;
	onClose: () => void;
}

const ModalConcluido: React.FC<ModalConcluidoProps> = ({
	open,
	protocolo,
	onClose,
}) => {
	const router = useRouter();

	function handleClose() {
		router.push('/sucesso');
	}
	return (
		<Dialog
			open={open}
			onOpenChange={onClose}>
			<DialogContent>
				<DialogTitle>Formulário enviado com sucesso</DialogTitle>
				<p className='mb-4'>
					Seu formulário foi enviado com sucesso. Anote o número do protocolo
					para referência futura.
				</p>
				<Button
					onClick={() => {
						navigator.clipboard.writeText(protocolo).then(() => {
							toast.success('Protocolo copiado para a área de transferência');
						});
					}}
					variant='outline'
					className='font-bold'>
					<Copy className='mr-2 h-4 w-4' />
					{protocolo}
				</Button>
				<Button
					onClick={handleClose}
					className='mt-4 px-4 py-2 bg-primary'>
					Fechar
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default ModalConcluido;
