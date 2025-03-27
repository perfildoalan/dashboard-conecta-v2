import { CarIcon, PencilIcon, TrashIcon } from 'lucide-react';
import React from 'react';

interface VehicleCardProps {
    id: number;
    color: string;
    brand: string;
    model: string;
    year: number | null;
    category: string;
    motor: string;
    onDelete: (id: number) => void;
    onEdit: (vehicle: { id: number; color: string; brand: string; model: string; year: number | null; category: string; motor: string; }) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ id, color, brand, model, year, category, motor, onDelete, onEdit }) => {
    return (
        <div className='relative flex flex-wrap bg-white/30 backdrop-blur-xl gap-2 border border-conecta-azul group rounded-2xl shadow-lg hover:shadow-2xl p-4 transition-all cursor-pointer'>
            <div className='flex items-center justify-center gap-4 bg-black/80 backdrop-blur-sm rounded-2xl absolute opacity-0 group-hover:opacity-100 transition-all top-0 left-0 size-full z-10'>
                <PencilIcon 
                    onClick={() => onEdit({ id, color, brand, model, year, category, motor })}
                    className='bg-conecta-azul rounded-xl p-2 size-10 text-white hover:text-secundaria hover:scale-110 transition-all cursor-pointer'
                />
                <TrashIcon 
                    onClick={() => onDelete(id)} 
                    className='bg-red-500 rounded-xl p-2 size-10 text-white hover:text-secundaria hover:scale-110 transition-all cursor-pointer'
                />
            </div>
            <div className="flex flex-wrap gap-4 justify-center items-center w-full">
                <div className='flex bg-white/50 backdrop-blur-xl w-full max-w-[320px] justify-center items-center rounded-2xl border-4 border-conecta-azul p-4'>
                    <CarIcon color={color} className="size-28 mx-auto" />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex items-start justify-start rounded-lg gap-2 px-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                        <p>Marca:</p><p className='text-white font-thin truncate'>{brand}</p>
                    </div>
                    <div className='flex items-start justify-start rounded-lg gap-2 px-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                        <p>Modelo:</p><p className='text-white font-thin truncate'>{model}</p>
                    </div>
                    <div className='flex items-start justify-start rounded-lg gap-2 px-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                        <p>Ano:</p><p className='text-white font-thin truncate'>{year}</p>
                    </div>
                    <div className='flex items-start justify-start rounded-lg gap-2 px-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                        <p>Categoria:</p><p className='text-white font-thin truncate'>{category}</p>
                    </div>
                    <div className='flex items-start justify-start rounded-lg gap-2 px-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                        <p>Motor:</p><p className='text-white font-thin truncate'>{motor}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
