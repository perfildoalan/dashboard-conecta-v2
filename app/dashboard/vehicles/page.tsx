"use client";
import { useState } from "react";
import VehicleCard from "./ui/vehicle-card";
import vehicleData from "./ui/vehicleData.json"; // Importando o JSON de dados
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutGridIcon, ListIcon } from "lucide-react";


interface Vehicle {
  id: number;
  color: string;
  brand: string;
  model: string;
  year: number | null;
  category: string;
  motor: string;
}

interface VehicleBrand {
  brand: string;
  models: VehicleModel[]; // Array de modelos
};

interface VehicleModel {
  model: string;
  years: VehicleYear[]; // Array de anos
};

interface VehicleYear {
  year: number;
  category: string;
  engine_power: string;
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [availableModels, setAvailableModels] = useState<VehicleModel[]>([]);
  const [availableYears, setAvailableYears] = useState<VehicleYear[]>([]);

  // Função para deletar um veículo
  const handleDelete = (id: number) => {
    setVehicles(
      vehicles.filter(
        vehicle => vehicle.id !== id
      )
    );
  };

  // Função para iniciar a edição de um veículo
  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setSelectedBrand(vehicle.brand);  // Atualizando a marca
    setSelectedModel(vehicle.model);  // Atualizando o modelo
    setIsAdding(false);
  };

  // Função para adicionar um novo veículo
  const handleAdd = () => {
    setEditingVehicle({
      id: Date.now(),
      color: "",
      brand: "",
      model: "",
      year: null,
      category: "",
      motor: ""
    });
    setIsAdding(true);
  };

  // Função para salvar as edições ou adições
  const handleSave = (updatedVehicle: Vehicle) => {
    if (isAdding) {
      setVehicles([...vehicles, updatedVehicle]);
    } else {
      setVehicles(vehicles.map(vehicle => vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle));
    }

    // Limpar os estados após salvar/adicionar
    setEditingVehicle(null); // Fecha o modal
    setIsAdding(false); // Reseta o estado de adição
    setSelectedBrand(""); // Reseta a marca selecionada
    setSelectedModel(""); // Reseta o modelo selecionado
    setAvailableYears([]); // Limpar anos disponíveis
  };

  // Função para atualizar modelos disponíveis com base na marca
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const brandData = vehicleData.brands.find((v: VehicleBrand) => v.brand === brand);
    setAvailableModels(brandData?.models ?? []);
    setSelectedModel("");  // Resetando o modelo ao mudar a marca
    setAvailableYears([]);  // Limpar anos ao mudar a marca
  };

  // Função para atualizar o modelo selecionado
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    const brandData = vehicleData.brands.find((v: VehicleBrand) => v.brand === selectedBrand);
    const modelData = brandData?.models.find((m: VehicleModel) => m.model === model);
    if (modelData) {
      setAvailableYears(modelData.years); // Definindo anos disponíveis para o modelo selecionado
      const yearData = modelData.years[0]; // Aqui, você pode ajustar conforme a lógica de ano, categoria e motor
      setEditingVehicle((prevVehicle) => ({
        ...prevVehicle!,
        brand: brandData?.brand ?? "",
        model: modelData.model,
        year: yearData.year,
        category: yearData.category,
        motor: yearData.engine_power,
      }));
    }
  };

  // Função para atualizar o ano selecionado
  const handleYearChange = (year: number) => {
    setEditingVehicle((prevVehicle) => ({
      ...prevVehicle!,
      year: year,
    }));
  };

  return (
    <>
    <ThemeProvider>
      <div className="flex w-full p-4 items-center justify-between">
        <h1 className="font-normal text-titlePage text-3xl">Veículos</h1>
        <div className="flex gap-4">
          <ListIcon className="size-10 text-black/30" />
          <LayoutGridIcon className="size-10 text-black/30" />
        </div>
      </div>
      <div className="grid grid-cols-1 mx-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {vehicles.map(vehicle => (
          <VehicleCard 
            key={vehicle.id} 
            id={vehicle.id} 
            color={vehicle.color} 
            brand={vehicle.brand} 
            model={vehicle.model} 
            year={vehicle.year} 
            category={vehicle.category} 
            motor={vehicle.motor} 
            onDelete={handleDelete} 
            onEdit={handleEdit}
          />
        ))}
      </div>
      <div className="w-full flex justify-center items-center mt-8">
        <button className="px-4 py-2 bg-green-500 hover:bg-green-300 transition-all hover:shadow-md text-2xl text-white rounded-full mb-4" onClick={handleAdd}>
          +
        </button>
      </div>

      {/* Modal de adicionar/editar */}
      {editingVehicle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="flex flex-col gap-8 bg-black/30 backdrop-blur-md p-6 text-white rounded-2xl shadow-2xl w-full sm:w-2/3 max-w-2xl mx-4 sm:mx-0">
            <div className="flex justify-start items-center bg-conecta-azul p-4 rounded-2xl">
              <h2 className="text-2xl font-thin">{isAdding ? "Adicionar Veículo" : "Editar Veículo"}</h2>
            </div>
            <div className="flex flex-col gap-4 justify-start items-start bg-black/30 backdrop-blur-md p-4 rounded-2xl">
              {/* Marca */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Marca:</label>
                <select 
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                >
                  <option value="">Selecione a marca</option>
                  {vehicleData.brands.map((brandData: VehicleBrand, index) => (
                    <option key={index} value={brandData.brand}>{brandData.brand}</option>
                  ))}
                </select>
              </div>
              {/* Modelo */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Modelo:</label>
                <select 
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={selectedModel}
                  onChange={(e) => handleModelChange(e.target.value)}
                >
                  <option value="">Selecione o modelo</option>
                  {availableModels.map((modelData, index) => (
                    <option key={index} value={modelData.model}>{modelData.model}</option>
                  ))}
                </select>
              </div>
              {/* Ano */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Ano:</label>
                <select 
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={editingVehicle.year ?? ""}
                  onChange={(e) => handleYearChange(parseInt(e.target.value))}
                >
                  <option value="">Selecione o ano</option>
                  {availableYears.map((yearData, index) => (
                    <option key={index} value={yearData.year}>{yearData.year}</option>
                  ))}
                </select>
              </div>
              {/* Categoria */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Categoria:</label>
                <input 
                  type="text" 
                  readOnly
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={editingVehicle.category}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, category: e.target.value })}
                />
              </div>
              {/* Motor */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Motor:</label>
                <input 
                  type="text" 
                  readOnly
                  className="w-full max-w-md p-2 rounded-full bg-white text-black" 
                  value={editingVehicle.motor}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, motor: e.target.value })}
                />
              </div>
              {/* Cor */}
              <div className="flex flex-col sm:flex-row gap-2 bg-conecta-azul px-4 py-2 rounded-lg justify-between items-center align-middle w-full">
                <label className="block">Cor:</label>
                <input 
                  type="color" 
                  className="w-full max-w-md h-10 px-4 rounded-full bg-white text-black" 
                  value={editingVehicle.color ?? "#000000"}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, color: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 items-center mt-4 w-full">
              {/** Verificação do formulário antes de habilitar o botão **/}
              <button 
                className={`px-4 py-2 rounded ${selectedBrand && selectedModel && editingVehicle.year && editingVehicle.category && editingVehicle.motor ? "bg-green-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`} 
                onClick={() => handleSave(editingVehicle)}
                disabled={!(selectedBrand && selectedModel && editingVehicle.year && editingVehicle.category && editingVehicle.motor)}
              >
                {isAdding ? "Adicionar" : "Salvar"}
              </button>
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded" 
                onClick={() => {
                  setEditingVehicle(null); // Fecha o modal
                  setIsAdding(false); // Reseta o estado de adição
                  setSelectedBrand(""); // Reseta a marca selecionada
                  setSelectedModel(""); // Reseta o modelo selecionado
                  setAvailableYears([]); // Limpar anos disponíveis
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      </ThemeProvider>
    </>
  );
}
