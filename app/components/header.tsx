"use client"
import Image from 'next/image'
import { Bell, Settings, Search, Languages, Sun, Moon } from "lucide-react";
import logoConecta from "@/assets/Images/logoConect2ai.svg"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import BellCard from './bellCard';
import { SheetDemo } from './sidebar';
import ConectaLogo from '@/ui/header/conecta-logo';
import { SidebarProvider } from './ui/sidebar';
  

export default function Header() {
    const { setTheme, theme } = useTheme()

    return (
        <header>
            <div className="grid grid-cols-3 max-md:grid-cols-4 max-[400px]:grid-cols-2 md:gap-[5vw] justify-between justify-items-center items-center w-screen h-[80px] bg-header shadow-[0px_8px_8px_rgba(0,0,0,0.10)]">
                <div className='flex ml-4 gap-4 justify-start justify-self-start items-center'>
                    <SidebarProvider>
                        <SheetDemo/>
                    </SidebarProvider>
                    <ConectaLogo color={(theme === 'dark' ? '#70E5FF' : 'white')} className="justify-self-start block transition-all max-md:hidden duration-300 hover:opacity-50 cursor-pointer" />
                </div>
                <div className='flex flex-row max-md:col-span-2 relative max-[400px]:hidden justify-center justify-items-center items-center w-full max-w-[500px]'>
                    <input type="text" id="site-search" className="pl-4 pr-10 rounded-3xl bg-transparent text-headerItens text-lg focus:outline-none border-2 border-solid border-headerItens w-full" />
                    <Search className='absolute right-4 transition-all cursor-pointer text-headerItens hover:opacity-50'/>
                </div>
                <div className='flex flex-row justify-end justify-self-end gap-4 mr-4 items-center'>
                <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Bell className="justify-self-start min-w-8 size-8 transition-all 
                             text-headerItens hover:opacity-50 cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=' max-w-72'>
                            <DropdownMenuItem>
                                <BellCard />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Settings className="justify-self-start min-w-8 size-8 transition-all
                            text-headerItens hover:opacity-50 cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Button variant="default" size="icon" className='w-full h-full border-0' >
                                    <Languages className='size-12'/>
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuItem> 
                            <DropdownMenuItem asChild>
                                <Button className='w-full h-full border-0' variant="default" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}