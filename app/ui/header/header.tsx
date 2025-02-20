import MenuBurg from "@/public/Icons/Menu.svg";
import { IconButtom } from "./icon-buttom";

export default function Header() {
    return (
        <header>
            <div className="w-screen h-[80px] bg-conecta-azul">
                <div className="">
                    <IconButtom srcImg={MenuBurg} alt="Icone de Menu" hover={true}></IconButtom>
                </div>
            </div>
        </header>
    )
}