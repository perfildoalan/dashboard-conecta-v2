"use Client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HomeIcon, Menu } from "lucide-react"
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
            <div className="align-middle">Home</div>
          </SidebarMenuButton>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
