"use client"

import { buscarPorLogin } from "@/services/ldap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

export default function FormBusca() {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const login = data.get("login");
        if (login) {
            const resposta = await fetch(`/api/ldap/buscar-por-login/${login}`)
            if (resposta.status === 200)
                console.log(await resposta.json())
        }
    }

    return <form onSubmit={handleSubmit}>
        <Input name="login" type="text" />
        <Button type="submit">Pesquisar</Button>
    </form>
}