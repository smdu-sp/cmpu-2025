/** @format */

import { create as CreteCadastro } from '@/app/api/cadastro/cadastro.dto';
import { db } from '@/lib/prisma';
import fs from 'fs';

function geraProtocolo(id: number) {
	const mascara = 17529 * id ** 2 + 85474;
	const chave1 = 7458321;
	const chave2 = 13874219;
	const protocolo = ((mascara + chave1) ^ chave2).toString();
	return `MOB-2025-${protocolo.padStart(10, '0')}`;
}

async function criarCadastro(cadastro: CreteCadastro): Promise<string | null> {
	const protocolo = await db.$transaction(
		async (tx) => {
			const { doc_especifica, projetos, participantes, ...data } = cadastro;
			const novo_cadastro = await tx.cadastro.create({ data });
			const protocolo = geraProtocolo(+novo_cadastro.id);
			try {
				console.log(cadastro.equipe, participantes);
				if (doc_especifica.length > 0)
					doc_especifica.map(async (file, index) => {
						const ext = file.name.split('.').pop();
						const data = await file.arrayBuffer();
						const pasta = `./uploads/${novo_cadastro.id}/doc_especifica`;
						if (!fs.existsSync(pasta))
							fs.mkdirSync(`./uploads/${novo_cadastro.id}/doc_especifica`, {
								recursive: true,
							});
						const caminho = `${pasta}/${index + 1}.${ext}`;
						fs.writeFileSync(caminho, Buffer.from(data));
						await tx.arquivo.create({
							data: {
								caminho,
								cadastroId: novo_cadastro.id,
								tipo: 'DOC_ESPECIFICA',
							},
						});
					});
				if (projetos.length > 0)
					projetos.map(async (file, index) => {
						const ext = file.name.split('.').pop();
						const data = await file.arrayBuffer();
						const pasta = `./uploads/${novo_cadastro.id}/projetos`;
						if (!fs.existsSync(pasta))
							fs.mkdirSync(`./uploads/${novo_cadastro.id}/projetos`, {
								recursive: true,
							});
						const caminho = `${pasta}/${index + 1}.${ext}`;
						fs.writeFileSync(caminho, Buffer.from(data));
						await tx.arquivo.create({
							data: { caminho, cadastroId: novo_cadastro.id, tipo: 'PROJETOS' },
						});
					});
				if (cadastro.equipe && participantes && participantes.length > 0)
					console.log(
						await tx.participante.createMany({
							data: participantes.map((participante) => ({
								...participante,
								cadastroId: novo_cadastro.id,
							})),
						}),
					);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				tx.cadastro.delete({ where: { id: novo_cadastro.id } });
				return null;
			}
			await tx.cadastro.update({
				where: { id: novo_cadastro.id },
				data: { protocolo },
			});
			return protocolo;
		},
		{
			maxWait: 20000,
			timeout: 60000,
		},
	);
	if (!protocolo) return null;
	return protocolo;
}

export { criarCadastro, geraProtocolo };
