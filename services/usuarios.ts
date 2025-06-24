/** @format */

import { db } from '@/lib/prisma';
import { ICreateUsuario } from '@/types/usuario';
import bcrypt from 'bcryptjs';

export async function criarUsuario(dados: ICreateUsuario) {
	if (dados.tipo === 'INTERNO') {
		const { login, email, nome, permissao } = dados;
		if (!login || login === '' || !email || email === '') return null;
		if (await buscarPorLogin(login)) return null;
		if (await buscarPorEmail(email)) return null;
		const usuario = await db.usuario.create({
			data: { login, email, nome, permissao, tipo: 'INTERNO' },
		});
		return usuario;
	}
	if (dados.tipo === 'EXTERNO') {
		const { email, nome, senha, permissao } = dados;
		if (!email || email === '' || !senha || senha === '') return null;
		if (await buscarPorEmail(email)) return null;
		const senhaHash = await bcrypt.hash(senha, 10);
		const usuario = await db.usuario.create({
			data: { email, nome, permissao, senha: senhaHash, tipo: 'EXTERNO' },
		});
		return usuario;
	}
	return null;
}

export async function buscarPorLogin(login: string) {
	const usuario = await db.usuario.findUnique({ where: { login } });
	return usuario;
}

export async function buscarPorEmail(email: string) {
	const usuario = await db.usuario.findUnique({ where: { email } });
	return usuario;
}
