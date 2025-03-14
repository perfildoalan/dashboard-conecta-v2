import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="justify-self-start min-w-8 size-8 transition-colors duration-300 text-white dark:text-conecta-azul-claro hover:text-gray-200 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className=" bg-conecta-azul w-/">
        <SheetHeader>
          <SheetTitle className=" sr-only">Edit profile</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>

      </SheetContent>
    </Sheet>
  )
}
