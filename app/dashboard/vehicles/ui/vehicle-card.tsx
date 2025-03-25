import { CarIcon, PencilIcon, TrashIcon } from 'lucide-react';
import React from 'react';

interface VehicleCardProps {
    color: string;
    brand: string;
    model: string;
    year: number;
    category: string;
    motor: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({color, brand, model, year, category, motor }) => {
    return (
        <div className='flex flex-col bg-white/30 backdrop-blur-sm gap-2 group rounded-2xl shadow-lg hover:shadow-2xl p-4 transition-all cursor-pointer'>
            <div className='flex items-center justify-center gap-4 bg-black/80 backdrop-blur-sm rounded-2xl absolute opacity-0 group-hover:opacity-100 transition-all top-0 left-0 size-full z-10'>
                <PencilIcon className='bg-conecta-azul rounded-xl p-2 size-10 text-white hover:text-secundaria hover:scale-110 transition-all'/>
                <TrashIcon className='bg-red-500 rounded-xl p-2 size-10 text-white hover:text-secundaria hover:scale-110 transition-all'/>
            </div>
            <div className=' flex bg-white/50 backdrop-blur-sm rounded-2xl w-full border-4 border-conecta-azul p-4'>
                <CarIcon color={color} className="size-28 mx-auto" />
            </div>
            <div className='flex items-start justify-start rounded-lg gap-2 pl-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                <p>Marca:</p><p className='text-white font-thin truncate'>{brand}</p>
            </div>
            <div className='flex items-start justify-start rounded-lg gap-2 pl-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                <p>Modelo:</p><p className='text-white font-thin truncate'>{model}</p>
            </div>
            <div className='flex items-start justify-start rounded-lg gap-2 pl-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                <p>Ano:</p><p className='text-white font-thin truncate'>{year}</p>
            </div>
            <div className='flex items-start justify-start rounded-lg gap-2 pl-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                <p>Categoria:</p><p className='text-white font-thin truncate'>{category}</p>
            </div>
            <div className='flex items-start justify-start rounded-lg gap-2 pl-2 bg-conecta-azul text-2xl text-conecta-azul-escuro font-normal'>
                <p>Motor:</p><p className='text-white font-thin truncate'>{motor}</p>
            </div>
        </div>
    );
};

export default VehicleCard;