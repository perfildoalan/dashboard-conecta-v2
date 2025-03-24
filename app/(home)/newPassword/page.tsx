'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import LogoConect2ai from "@/assets/Images/logo.png"
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { newPasswordAction } from "./newPassword.action";

const initialState = {
    message: "",
  };

export default function NewPassword() {
    const [state, formAction] = useActionState(newPasswordAction, initialState)
    const { pending } = useFormStatus();
        
    return (
        <div className="flex text-black flex-col w-[33rem] gap-4 p-8 rounded-2xl bg-white items-center justify-center">
        <Image src={LogoConect2ai.src} alt="" width={200} height={200}/>
        <span className=" text-center font-xs text-xl">Plataforma de análise de dados para veículos conectados</span>
        <form action={formAction} className=" w-full space-y-4">
          <div className="flex flex-col">
              <Label htmlFor="password" className="text-sm text-black/50">Password</Label>
              <Input id="password" name="password" type="text" className="border rounded-md p-6 border-black/20"/>
          </div>
          <div className="flex flex-col">
              <Label htmlFor="newPassword" className="text-sm text-black/50">newPassword</Label>
              <Input id="newPassword" name="newPassword" type="text" className="border rounded-md p-6 border-black/20"/>
          </div>
          {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}
          <Button disabled={pending} type="submit" className="bg-conecta-azul text-white rounded-md p-2 w-full mt-1 font-medium text-lg">Enviar</Button>
        </form>
    </div>
    )
}
