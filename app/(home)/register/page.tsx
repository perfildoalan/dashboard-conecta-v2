'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import LogoConect2ai from "@/assets/Images/logo.png"
import { registerAction } from "./register.action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";

const initialState = {
    message: "",
  };

export default function RegisterPage() {
        const [state, formAction] = useActionState(registerAction, initialState)
        const { pending } = useFormStatus();

        const searchParams = useSearchParams();
        const jwt = searchParams.get('jwt');

        if(!jwt) {
            window.location.href = "/";
            return null;
        }

    return (
        <div className="flex text-black flex-col w-[33rem] gap-4 p-8 rounded-2xl bg-white items-center justify-center">
        <Image src={LogoConect2ai.src} alt="" width={200} height={200}/>
        <span className=" text-center font-xs text-xl">Plataforma de análise de dados para veículos conectados</span>
        <form action={formAction} className=" w-full space-y-4">
        <div className="flex flex-col">
              <Label htmlFor="name" className="text-sm text-black/50">name</Label>
              <Input id="name" name="name" type="text" className="border rounded-md p-6 border-black/20"/>
        </div>

        <div className="flex flex-col">
              <Label htmlFor="username" className="text-sm text-black/50">username</Label>
              <Input id="username" name="username" type="text" className="border rounded-md p-6 border-black/20"/>
        </div>

          <div className="flex flex-col">
              <Label htmlFor="email" className="text-sm text-black/50">email</Label>
              <Input id="email" name="email" type="text" className="border rounded-md p-6 border-black/20"/>
          </div>

          <div className="flex flex-col">
              <Label htmlFor="password" className="text-sm text-black/50">password</Label>
              <Input id="password" name="password" type="text" className="border rounded-md p-6 border-black/20"/>
          </div>

          <div className="flex flex-col">
              <Label htmlFor="confirmPassword" className="text-sm text-black/50">confirmPassword</Label>
              <Input id="confirmPassword" name="confirmPassword" type="text" className="border rounded-md p-6 border-black/20"/>
          </div>

          <div className="flex flex-col">
              <Label htmlFor="typeUser" className="text-sm text-black/50">typeUser</Label>
              <Input id="typeUser" name="typeUser" type="text" className="border rounded-md p-6 border-black/20"/>
          </div>

          <div className="flex flex-col sr-only">
              <Label htmlFor="jwt" className="text-sm text-black/50">jwt</Label>
              <Input id="jwt" name="jwt" type="text" value={jwt} className="border rounded-md sr-only p-6 border-black/20"/>
          </div>
          {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}
          <Button disabled={pending} type="submit" className="bg-conecta-azul text-white rounded-md p-2 w-full mt-1 font-medium text-lg">Confirmar</Button>
        </form>
        <p className=" font-medium text-base text-black/60"><Link href="/register" className="font-bold hover:text-black/80">Volte para o Login</Link></p>
    </div>
    )
}
