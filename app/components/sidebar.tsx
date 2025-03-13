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
        <Menu className="transition-colors duration-300 text-white dark:text-conecta-azul-claro hover:text-gray-200 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className=" bg-red-500 w-/">
        <SheetHeader>
          <SheetTitle className=" sr-only">Edit profile</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>

      </SheetContent>
    </Sheet>
  )
}
