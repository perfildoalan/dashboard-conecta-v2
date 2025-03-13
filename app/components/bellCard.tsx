import { Bell } from "lucide-react";

export default function BellCard() {
    return(
        <div className=" flex">
            <div className=" px-3 py-5">
                <Bell/>
            </div>
            <div className="flex flex-col ">
                <p className="text-sm font-semibold">17/02/25 - 12:32</p>
                <p className="text-xs text-gray-500">Viagem adicionada entre João Pessoa/PB e Natal/RN</p>
            </div>
        </div>
    )
}