import Image from 'next/image';
import MenuBurg from "@/public/Icons/Menu.svg";

export default function Header() {
    return (
        <header>
            <div className="w-screen h-[80px] bg-conecta-azul p-[10px]">
                <Image 
                    src={MenuBurg} 
                    alt="Icone de Menu"
                    className="w-[50px] transition-all duration-500 hover:invert-[0.20]"
                />
            </div>
        </header>
    )
}