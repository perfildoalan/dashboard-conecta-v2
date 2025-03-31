"use client";

import { useEffect, useState } from "react";
import { Download, Eye, LayoutGridIcon, ListIcon, PencilIcon, TrashIcon } from "lucide-react";
import { getRequest } from "../utils/getRequest";
import { deleteRequest } from "../utils/deleteRequeste";
import { postRequest } from "../utils/postRequest";
import TripCardMap from "./components/tripCardMap";
import MapRoute from "@/components/mapRoute";
import Link from "next/link";
import { LatLngExpression } from 'leaflet'

interface Trip {
  id: number;
  departure: string;
  destination: string;
  date: string;
  duration: string;
  probability: string;
  vehicle: string;
  location: LatLngExpression[]
}

interface Vehicle {
  id: number;
  color: string;
  brand: string;
  model: string;
  year: number ;
  category: string;
  version: string;
}

export default function Trips() {
  const [userTrips, setUserTrips] = useState<Trip[]>();
  const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);
  const [isAdding, setIsAdding] = useState<number | null>();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    await deleteRequest(`/v1/user-area/trip/delete-trip`, {ime_session: id});
  };

  const handleSave = async () => {
    await postRequest(`/v1/user-area/vehicle/register/${selectedVehicle}`, {time_session: isAdding});
    setIsAdding(null); // Reseta o estado de adição
  };

  const getAllTrips = async () => {
    const data = await getRequest('/v1/user-area/trip/get-user-trips');
    setUserTrips((prevData) => ([
      ...(prevData || []),
      ...data
    ]));
  };

  const getAllUserCar = async () => {
    const data = await getRequest('/v1/user-area/vehicle/user-vehicles');
    setUserVehicles(data);
  };

  async function handleCSV(time_session: string) {
    const response = await getRequest(`/data-collection/trip/csv?time_session=${time_session}`, {
      responseType: 'blob',
    });

    // create file link in browser's memory
    const href = URL.createObjectURL(response);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'file.csv'); // or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  useEffect(() => {
    getAllTrips();
    getAllUserCar()
  },[])

  return (
    <>
        <div className="flex w-full min-w-[100rem] p-4 items-center justify-between">
          <h1 className="font-normal text-titlePage text-3xl">Viagens</h1>
          <div className="flex gap-4">
            <ListIcon
              className={`size-10 text-black/30 cursor-pointer ${viewMode === 'list' ? 'text-conecta-azul' : ''}`}
              onClick={() => setViewMode('list')}
            />
            <LayoutGridIcon
              className={`size-10 text-black/30 cursor-pointer ${viewMode === 'grid' ? 'text-conecta-azul' : ''}`}
              onClick={() => setViewMode('grid')}
            />
          </div>
        </div>
        <div className={(
          viewMode === 'grid' 
            ? 'grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-4' 
            : 'flex flex-col gap-4 mx-4'
        )}>
            {userTrips?.map(trip => (
            <div key={trip.id} className={`flex justify-between bg-conecta-azul backdrop-blur-md rounded-2xl shadow-2xl ${viewMode === 'grid' ? 'h-[300px]' : ''}`}>
              <div className=" bg-white w-[85rem] h-[28rem] text-black flex flex-col justify-between rounded-2xl">
                <MapRoute location={trip.location} />
                <div className="flex gap-2 ">
                  <TripCardMap title={trip.destination} mapData={trip.date} size="w-full h-full" />
                  <TripCardMap title={trip.departure} mapData={trip.duration} size="w-full h-full" />
                  <TripCardMap title={trip.probability} mapData={trip.vehicle} size="w-full h-full" />
                  </div>
              </div>
              <div className="flex flex-col justify-center gap-6 items-center mt-auto min-w-52 h-[28rem] rounded-2xl p-4">
                <PencilIcon 
                  onClick={() => { setIsAdding(trip.id); setSelectedVehicle(trip.vehicle); }}
                      className='bg-conecta-azul-escuro rounded-xl p-2 size-10 text-white hover:text-secundaria hover:scale-110 transition-all cursor-pointer'
                  />
                <Link href={`/dashboard/trips/${trip.id}`}>
                
                <Eye className='bg-conecta-azul-escuro rounded-xl p-2 size-10 text-white hover:text-secundaria hover:scale-110 transition-all cursor-pointer' />
                </Link>
                <Download onClick={() => handleCSV(String(trip.id))}  className='bg-conecta-azul-escuro rounded-xl p-2 size-10 text-white hover:text-secundaria hover:scale-110 transition-all cursor-pointer'/>
                <TrashIcon 
                  onClick={() => handleDelete(trip.id)}
                  className='bg-red-500 rounded-xl p-2 size-10 text-white hover:text-secundaria hover:scale-110 transition-all cursor-pointer'
                />
              </div>
            </div>
            ))}
        </div>
      {/* Modal de adicionar/editar */}
      {isAdding && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-auto"
          onClick={(e) => {
            // Verifica se o clique foi fora do conteúdo do popup
            if (e.target === e.currentTarget) {
              setIsAdding(null); // Reseta o estado de adição
            }
          }}>
          <div className="scroll-styled flex flex-col gap-8 bg-black/30 backdrop-blur-md p-6 text-white rounded-2xl shadow-2xl w-full max-h-[80vh] overflow-y-auto sm:w-2/3 max-w-2xl mx-4 sm:mx-0">
            <div className="flex justify-start items-center bg-conecta-azul p-4 rounded-2xl">
              <h2 className="text-2xl font-thin">{isAdding ? "Adicionar Veículo" : "Editar Veículo"}</h2>
            </div>
            <div className="flex flex-col gap-4 justify-start items-start bg-black/30 backdrop-blur-md p-4 rounded-2xl">
              {/* Marca */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Veículo:</label>
                <select 
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={isAdding}
                  onChange={(e) => {
                  const selectedBrand = e.target.value;
                  setSelectedVehicle(selectedBrand);
                  }}
                >
                  <option value="">Selecione o veículo</option>
                  {userVehicles?.map((vehicle, index) => (
                  <option key={index} value={vehicle.id}>{vehicle.brand+vehicle.model+vehicle.version}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 items-center mt-4 w-full">
              {/** Verificação do formulário antes de habilitar o botão **/}
              <button 
                className={`px-4 py-2 rounded ${selectedVehicle ? "bg-green-500 hover:bg-green-400 transition-colors text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`} 
                onClick={() => handleSave()}
                disabled={!( selectedVehicle )}
              >
                {isAdding ? "Adicionar" : "Salvar"}
              </button>
              <button 
                className="px-4 py-2 bg-red-500 hover:bg-red-400 transition-colors text-white rounded" 
                onClick={() => {
                  setIsAdding(null); // Reseta o estado de adição
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
