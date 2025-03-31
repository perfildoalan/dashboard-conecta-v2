"use client";

import { useEffect, useState } from "react";
import { LayoutGridIcon, ListIcon } from "lucide-react";
import { getRequest } from "../utils/getRequest";
import { postRequest } from "../utils/postRequest";
import { LatLngExpression } from 'leaflet'
import EmissionsCard from "./components/emissionsCard";
import Co2LineChart from "./components/LineChatCo2";

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

const chartData = [
  {
    id: 1,
    data: [
      {
        time_session: "2024-12-19T08:28:08",
        vehicle: {
          version: "N/A",
          brand: "N/A",
          model: "N/A",
          year: -1,
          id: 36255,
          category: "N/A",
        },
        VIN: "ABCDEFGHIJKLMNOPQ",
        location: [
          [-5.749283, -35.2599199],
          [-5.749283, -35.2599199],
        ],
        total_distance: 25.5816382614314,
        total_time: 2620,
        total_emissions: 4077.3,
        total_trees: 1.7204497703808803,
        ghg_protocol: 3669.435000000001,
        compensation_days: 0.37154284183390335,
        emission_by_km: 159.3838501792597,
        emissions: {
          emission: 4077.3,
          emission_list: [0, 0, 0, 0.641, 0.641, 0.641, 0.646],
        },
      },
    ],
  },
  {
    id: 2,
    data: [
      {
        time_session: "2024-12-19T08:28:08",
        vehicle: {
          version: "N/A",
          brand: "N/A",
          model: "N/A",
          year: -1,
          id: 36255,
          category: "N/A",
        },
        VIN: "ABCDEFGHIJKLMNOPQ",
        location: [
          [-5.749283, -35.2599199],
          [-5.749283, -35.2599199],
        ],
        total_distance: 25.5816382614314,
        total_time: 2620,
        total_emissions: 4077.3,
        total_trees: 1.7204497703808803,
        ghg_protocol: 3669.435000000001,
        compensation_days: 0.37154284183390335,
        emission_by_km: 159.3838501792597,
        emissions: {
          emission: 4077.3,
          emission_list: [0, 0, 0, 0.641, 0.641, 0.641, 0.646],
        },
      },
    ],
  },
  {
    id: 3,
    data: [
      {
        time_session: "2024-12-19T08:28:08",
        vehicle: {
          version: "N/A",
          brand: "N/A",
          model: "N/A",
          year: -1,
          id: 36255,
          category: "N/A",
        },
        VIN: "ABCDEFGHIJKLMNOPQ",
        location: [
          [-5.749283, -35.2599199],
          [-5.749283, -35.2599199],
        ],
        total_distance: 25.5816382614314,
        total_time: 2620,
        total_emissions: 4077.3,
        total_trees: 1.7204497703808803,
        ghg_protocol: 3669.435000000001,
        compensation_days: 0.37154284183390335,
        emission_by_km: 159.3838501792597,
        emissions: {
          emission: 4077.3,
          emission_list: [0, 0, 0, 0.641, 0.641, 0.641, 0.646],
        },
      },
    ],
  },
];

const timestamps = chartData[0]?.data[0]?.emissions.emission_list.map((_, index) => {
  const baseTime = new Date("2024-12-19T08:28:08").getTime();
  return new Date(baseTime + index * 60000).toISOString(); // Incrementa 1 minuto por índice
});

export default function Trips() {
  const [userTrips, setUserTrips] = useState<Trip[]>();
  const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);
  const [isAdding, setIsAdding] = useState<number | null>();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

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

  useEffect(() => {
    getAllTrips();
    getAllUserCar()
  },[])

  return (
    <>
        <div className="flex w-full min-w-[100rem] p-4 items-center justify-between">
          <h1 className="font-normal text-titlePage text-3xl text-[#00ABD0]">Emissões Totais</h1>
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
        <div className=" w-full gap-12 flex justify-center items-center bg-[#3C4854] p-4 rounded-2xl">

          <EmissionsCard title="text" subtitle="text2"/>

          <EmissionsCard title="text" subtitle="text2"/>

          <EmissionsCard title="text" subtitle="text2"/>

          <EmissionsCard title="text" subtitle="text2"/>

        </div>

        <h1 className="font-normal text-titlePage text-3xl ml-4 mt-4 text-white mb-4">Emissões por viagens</h1>

        <div className={(
          viewMode === 'grid' 
            ? 'grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-4' 
            : 'flex flex-col gap-4 mx-4'
        )}>
            {chartData?.map((data, index) => (
            <div key={data.id} className={`flex justify-between bg-transparent/20 backdrop-blur-md rounded-2xl shadow-2xl ${viewMode === 'grid' ? 'h-[300px]' : ''}`}>
              <div className=" w-[85rem] h-[28rem] text-black flex flex-col self-center rounded-2xl">
              <Co2LineChart
                title="titulo"
                measure="g"
                dataCarbono={data?.data[index]?.emissions.emission_list || []}
                dataGhg={data?.data[index]?.ghg_protocol || 0}
                timestamps={timestamps}
              />
              </div>

              <div className="flex m-12 flex-col justify-center  items-center min-w-52 h-[28rem] bg-[#3C4854] rounded-2xl p-4">
              <EmissionsCard title="Data" subtitle="text2"/>
              <EmissionsCard title="Duração" subtitle="text2"/>
              <EmissionsCard title="Probabilidade" subtitle="text2"/>
              <EmissionsCard title="Veículo" subtitle={data?.data[0]?.vehicle.brand}/>
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
