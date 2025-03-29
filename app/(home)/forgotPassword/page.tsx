'use client'
import Image from "next/image"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoConect2ai from "@/assets/Images/logo.png"
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { forgotPasswordAction } from "./forgotPassword.action";
import Link from "next/link";

const initialState = {
  message: "",
};

export default function ForgotPassword() {
    const [state, formAction] = useActionState(forgotPasswordAction, initialState)
    const { pending } = useFormStatus();

  return (
    <div className="flex text-black flex-col w-[33rem] gap-4 p-8 rounded-2xl bg-white items-center justify-center">
        <Image src={LogoConect2ai.src} alt="" width={200} height={200}/>
        <span className=" text-center font-xs text-xl">Plataforma de análise de dados para veículos conectados</span>
        <form action={formAction} className=" w-full space-y-4">
          <div className="flex flex-col">
              <Label htmlFor="email" className="text-sm text-black/50">Email</Label>
              <Input id="email" name="email" type="text" className="border rounded-md p-6 border-black/20"/>
              {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}
          </div>
          <Button disabled={pending} type="submit" className="bg-conecta-azul text-white rounded-md p-2 w-full mt-1 font-medium text-lg">Enviar</Button>
        </form>
        <p className=" font-medium text-base text-black/60"><Link href="/register" className="font-bold hover:text-black/80">Volte para o Login</Link></p>
    </div>
  )
}

