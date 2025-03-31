'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoConect2ai from "@/assets/Images/logo.png"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "./login.action";

const initialState = {
    message: "",
  };
  

export default function Login() {
    const [state, formAction] = useActionState(loginAction, initialState)
    const { pending } = useFormStatus();

    return (
    <section>
        <div className="flex text-black flex-col w-[33rem] gap-4 p-8 rounded-2xl bg-white items-center justify-center">
        <Image src={LogoConect2ai.src} alt="" width={200} height={200}/>
        <span className=" text-center font-xs text-xl">Plataforma de análise de dados para veículos conectados</span>
        <h1 className="text-3xl font-medium">Login</h1>

        <form  action={formAction} className=' w-full h-full space-y-4 items-end flex flex-col'>
            <div className="flex flex-col w-full">
                <Label htmlFor="username" className="text-sm text-black/50">Usuário</Label>
                <Input id="username" name="username" type="text" className="border rounded-md p-6 border-black/20 hover:border-black/40"/>
            </div>
            <div className="flex flex-col w-full">
                <Label htmlFor="password" className="text-sm text-black/50">Senha</Label>
                <Input id="password" name="password" type="password" className="border rounded-md p-6 border-black/20 hover:border-black/40"/>
            </div>
            {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}
            <Link href="/forgotPassword" className='font-semibold text-sm text-black/60 hover:text-black/80 '>Esqueceu a senha ?</Link>
            <Button type="submit" disabled={pending}  className="bg-conecta-azul text-white rounded-md p-2 w-full mt-1 font-medium text-lg">Entrar</Button>
        </form>

        <p className=" font-medium text-base text-black/60">Não tem uma conta? <Link href="/register" className="font-bold hover:text-black/80">Cadastre-se</Link></p>
        </div>
    </section>
    )
}
