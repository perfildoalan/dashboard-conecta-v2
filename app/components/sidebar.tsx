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

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="justify-self-start min-w-10 size-10 transition-all text-headerItens hover:opacity-50 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-header w-/">
        <SheetHeader>
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription>
          </SheetDescription>
          <SidebarMenuButton>
            <HomeIcon className=""/>
            <div className="align-middle font-regular">Home</div>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <CarIcon className=""/>
            <div className="align-middle font-regular">Veículos</div>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <MapIcon className=""/>
            <div className="align-middle font-regular">Viagens</div>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <SproutIcon className=""/>
            <div className="align-middle font-regular">Emissões</div>
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
