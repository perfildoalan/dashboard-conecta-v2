import { Bell } from "lucide-react";

export default function BellCard() {
    return(
        <div className="flex">
            <div className=" px-3 py-5">
                <Bell className="text-white"/>
            </div>
            <div className="flex flex-col ">
                <p className="text-sm font-semibold text-white">17/02/25 - 12:32</p>
                <p className="text-xs text-white">Viagem adicionada entre João Pessoa/PB e Natal/RN</p>
            </div>
        </div>
    )
}