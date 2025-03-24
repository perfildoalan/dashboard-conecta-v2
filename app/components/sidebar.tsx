"use Client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CarIcon, HomeIcon, LogOutIcon, MapIcon, Menu, SproutIcon } from "lucide-react"
import { SidebarMenuButton } from "./ui/sidebar"
import Link from 'next/link'

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="justify-self-start min-w-10 size-10 transition-all text-headerItens hover:opacity-50 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-header/90 backdrop-blur-sm w-/">
        <SheetHeader>
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription>
          </SheetDescription>
          <SidebarMenuButton>
            <HomeIcon className=""/>
            <div className="align-middle font-regular"><Link href="/dashboard">Home</Link></div>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <CarIcon className=""/>
            <div className="align-middle font-regular"><Link href="/dashboard/vehicles">Veículos</Link></div>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <MapIcon className=""/>
            <div className="align-middle font-regular"><Link href="/dashboard/trips">Viagens</Link></div>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <SproutIcon className=""/>
            <div className="align-middle font-regular"><Link href="/dashboard/emissions">Emissões</Link></div>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <LogOutIcon className=""/>
            <div className="align-middle font-regular">Sair</div>
          </SidebarMenuButton>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
