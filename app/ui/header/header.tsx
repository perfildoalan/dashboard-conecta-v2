import Image from 'next/image'

import { Bell, Menu, Settings, Search } from "lucide-react";
import ConectaLogo from './conecta-logo';

export default function Header() {
    return (
        <header>
            <div className="grid grid-cols-3 max-md:grid-cols-4 max-[400px]:grid-cols-2 md:gap-[5vw] justify-between justify-items-center items-center w-screen h-[80px] bg-conecta-azul dark:bg-conecta-azul-escuro shadow-[0px_8px_8px_rgba(0,0,0,0.10)]">
                <div className='flex flex-row ml-4 gap-4 justify-start justify-self-start items-center'>
                    <Menu className="justify-self-start min-w-12  size-12 transition-colors duration-300 text-white dark:text-conecta-azul-claro hover:text-conecta-azul-escuro cursor-pointer" />
                    {/* <ConectaLogo color='red-300' colorHover='white'/> */}
                </div>
                <div className='flex flex-row max-md:col-span-2 relative max-[400px]:hidden justify-center justify-items-center items-center w-full max-w-[500px]'>
                    <input type="text" id="site-search" className="pl-4 pr-10 rounded-3xl bg-transparent text-white dark:text-conecta-azul-claro text-lg focus:outline-none border-2 border-solid border-white dark:border-conecta-azul-claro w-full" />
                    <Search className='absolute right-4 transition-colors duration-300 cursor-pointer text-white hover:text-conecta-azul-escuro dark:text-conecta-azul-claro'/>
                </div>
                <div className='flex flex-row justify-end justify-self-end gap-4 mr-4 items-center'>
                    <Bell className="justify-self-start min-w-8 size-8 transition-colors duration-300 text-white dark:text-conecta-azul-claro hover:text-conecta-azul-escuro cursor-pointer" />
                    <Settings className="justify-self-start min-w-8 size-8 transition-colors duration-300 text-white dark:text-conecta-azul-claro hover:text-conecta-azul-escuro cursor-pointer" />
                </div>
            </div>
        </header>
    )
}