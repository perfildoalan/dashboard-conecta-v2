"use client";

import { useEffect, useState } from "react";
import VehicleCard from "./ui/vehicle-card";
import { LayoutGridIcon, ListIcon, PlusIcon } from "lucide-react";
import { getRequest } from "../utils/getRequest";
import { deleteRequest } from "../utils/deleteRequeste";
import { postRequest } from "../utils/postRequest";


interface Vehicle {
  id: number;
  color: string;
  brand: string;
  model: string;
  year: number ;
  category: string;
  version: string;
}

interface VehicleData {
  version?: string[];
  brand?: string[];
  model?: string[];
  year?: number[];
  id?: number;
  category?: string[];
}

export default function Vehicles() {
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [userVehicles, setUserVehicles] = useState<Vehicle[]>();
  const [isAdding, setIsAdding] = useState(false);
  const [availableVehicleData, setAvailableVehicleData] = useState<VehicleData | undefined>();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleDelete = async (id: number) => {
    await deleteRequest(`/v1/user-area/vehicle/unregister/${id}`, {}, 'force-cache');
  };


  const getAllBrand = async () => {
    const data = await getRequest('/v1/user-area/vehicle/unique-brands');
    setAvailableVehicleData((prevData: VehicleData | undefined) => ({
      ...prevData,
      brand: data
    }));
  };

  const getAllUserCar = async () => {
    const data = await getRequest('/v1/user-area/vehicle/user-vehicles');
    setUserVehicles(data);
  };

  const getDataVehicle = async ({ version, model, brand, year, category }: Partial<Vehicle>) => {
      const data = await getRequest(`/v1/user-area/vehicle/?${brand}&${model}&${year}&${version}&${category}`);
      setAvailableVehicleData(data);
    };

  const handleSave = async (vehicle: Vehicle) => {
    await postRequest(`/v1/user-area/vehicle/register/${vehicle.id}`);
    setVehicle({} as Vehicle); // Fecha o modal
    setIsAdding(false); // Reseta o estado de adição
  };

  useEffect(() => {
    getAllBrand();
    getAllUserCar()
  },[])



  return (
    <>
      
        <div className="flex w-full min-w-[100rem] p-4 items-center justify-between">
          <h1 className="font-normal text-titlePage text-3xl">Veículos</h1>
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
        <div className={`${
            viewMode === 'grid' 
            ? 'grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-4' 
            : 'flex flex-col gap-4 mx-4'
          }`}>
            {userVehicles?.map(vehicle => (
            <VehicleCard 
              key={vehicle.id} 
              id={vehicle.id} 
              color={vehicle.color} 
              brand={vehicle.brand} 
              model={vehicle.model} 
              year={vehicle.year} 
              category={vehicle.category} 
              motor={vehicle.version} 
              onDelete={() => handleDelete(vehicle.id)}
              onEdit={() => {
              setVehicle(vehicle);
              setIsAdding(true);
              }}
            />
            ))}
        </div>
        <div className="w-full flex justify-center items-center mt-8">
            <button className="p-4 bg-green-500 hover:bg-green-300 transition-all hover:shadow-xl rounded-full mb-4" onClick={() => {setIsAdding(true)}}>
              <PlusIcon className="size-8 text-white" />
            </button>
        </div>
      {/* Modal de adicionar/editar */}
      {isAdding && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-auto"
          onClick={(e) => {
            // Verifica se o clique foi fora do conteúdo do popup
            if (e.target === e.currentTarget) {
              setVehicle({} as Vehicle); // Fecha o modal
              setIsAdding(false); // Reseta o estado de adição
            }
          }}>
          <div className="scroll-styled flex flex-col gap-8 bg-black/30 backdrop-blur-md p-6 text-white rounded-2xl shadow-2xl w-full max-h-[80vh] overflow-y-auto sm:w-2/3 max-w-2xl mx-4 sm:mx-0">
            <div className="flex justify-start items-center bg-conecta-azul p-4 rounded-2xl">
              <h2 className="text-2xl font-thin">{isAdding ? "Adicionar Veículo" : "Editar Veículo"}</h2>
            </div>
            <div className="flex flex-col gap-4 justify-start items-start bg-black/30 backdrop-blur-md p-4 rounded-2xl">
              {/* Marca */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Marca:</label>
                <select 
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={vehicle?.brand}
                  onChange={(e) => {
                  const selectedBrand = e.target.value;
                  setVehicle((prev) => prev ? { ...prev, brand: selectedBrand } : undefined);
                  getDataVehicle({ brand: selectedBrand });
                  }}
                >
                  <option value="">Selecione a marca</option>
                  {availableVehicleData?.brand?.map((brandData, index) => (
                  <option key={index} value={brandData}>{brandData}</option>
                  ))}
                </select>
              </div>
              {/* Modelo */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Modelo:</label>
                <select 
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={vehicle?.model}
                  onChange={(e) => {
                  const selectedModel = e.target.value;
                  setVehicle((prev) => prev ? { ...prev, model: selectedModel } : undefined);
                  getDataVehicle({ model: selectedModel, brand: vehicle?.brand });
                  }}
                >
                  <option value="">Selecione o modelo</option>
                  {availableVehicleData?.model?.map((modelData, index) => (
                  <option key={index} value={modelData}>{modelData}</option>
                  ))}
                </select>
              </div>
              {/* Ano */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Ano:</label>
                <select 
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={vehicle?.year}
                  onChange={(e) => {
                  const selectedYear = Number(e.target.value);
                  setVehicle((prev) => prev ? { ...prev, year: selectedYear } : undefined);
                  getDataVehicle({ year: selectedYear, brand: vehicle?.brand, model: vehicle?.model });
                  }}
                >
                  <option value="">Selecione o ano</option>
                  {availableVehicleData?.year?.map((yearData, index) => (
                  <option key={index} value={yearData}>{yearData}</option>
                  ))}
                </select>
              </div>
              {/* Categoria */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Categoria:</label>
                <select 
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={vehicle?.category}
                  onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setVehicle((prev) => prev ? { ...prev, category: selectedCategory } : undefined);
                  getDataVehicle({ category: selectedCategory, brand: vehicle?.brand, model: vehicle?.model, year: vehicle?.year });
                  }}
                >
                  <option value="">Selecione a categoria</option>
                  {availableVehicleData?.category?.map((categoryData, index) => (
                  <option key={index} value={categoryData}>{categoryData}</option>
                  ))}
                </select>
              </div>
              {/* Motor */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Motor:</label>
                <select 
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={vehicle?.version}
                  onChange={(e) => {
                  const selectedVersion = e.target.value;
                  setVehicle((prev) => prev ? { ...prev, version: selectedVersion } : undefined);
                  getDataVehicle({ version: selectedVersion, brand: vehicle?.brand, model: vehicle?.model, year: vehicle?.year, category: vehicle?.category });
                  }}
                >
                  <option value="">Selecione a versão</option>
                  {availableVehicleData?.version?.map((versionData, index) => (
                  <option key={index} value={versionData}>{versionData}</option>
                  ))}
                </select>
              </div>
              {/* Cor */}
              {/* <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Cor:</label>
                <input 
                  type="color" 
                  className="w-full max-w-md h-10 px-4 rounded-full bg-white text-black" 
                  value={vehicle.color ?? "#000000"}
                  onChange={(e) => setVehicle((prev) => prev ? { ...prev, color: e.target.value } : undefined)}
                />
              </div> */}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 items-center mt-4 w-full">
              {/** Verificação do formulário antes de habilitar o botão **/}
              <button 
                className={`px-4 py-2 rounded ${vehicle ? "bg-green-500 hover:bg-green-400 transition-colors text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`} 
                onClick={() => vehicle && handleSave(vehicle)}
                disabled={!(vehicle && vehicle.year && vehicle.category && vehicle.version )}
              >
                {isAdding ? "Adicionar" : "Salvar"}
              </button>
              <button 
                className="px-4 py-2 bg-red-500 hover:bg-red-400 transition-colors text-white rounded" 
                onClick={() => {
                  setVehicle({} as Vehicle); // Fecha o modal
                  setIsAdding(false); // Reseta o estado de adição
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
