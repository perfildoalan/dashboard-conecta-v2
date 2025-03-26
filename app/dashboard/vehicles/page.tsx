"use client";
import { useState } from "react";
import VehicleCard from "./ui/vehicle-card";
import vehicleData from "./ui/vehicleData.json"; // Importando o JSON de dados
import { ThemeProvider } from "@/components/theme-provider";

interface Vehicle {
  id: number;
  color: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  motor: string;
}

interface VehicleBrand {
  brand: string;
  models: {
    model: string;
    years: {
      year: number;
      category: string;
      engine_power: string;
    }[]; 
  }[];
}

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [availableModels, setAvailableModels] = useState<any[]>([]);
  const [availableYears, setAvailableYears] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Função para deletar um veículo
  const handleDelete = (id: number) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  // Função para iniciar a edição de um veículo
  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setSelectedBrand(vehicle.brand);  // Atualizando a marca
    setSelectedModel(vehicle.model);  // Atualizando o modelo
    setSelectedColor(vehicle.color); // Atualizando a cor
    setIsAdding(false);
  };

  // Função para adicionar um novo veículo
  const handleAdd = () => {
    setEditingVehicle({
      id: Date.now(),
      color: "",  // Cor inicial vazia
      brand: "",
      model: "",
      year: "",
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
    setSelectedColor(""); // Limpar cor selecionada
  };

  // Função para atualizar modelos disponíveis com base na marca
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const brandData = vehicleData.brands.find((v: VehicleBrand) => v.brand === brand);
    setAvailableModels(brandData?.models || []);
    setSelectedModel("");  // Resetando o modelo ao mudar a marca
    setAvailableYears([]);  // Limpar anos ao mudar a marca
  };

  // Função para atualizar o modelo selecionado
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    const brandData = vehicleData.brands.find((v: VehicleBrand) => v.brand === selectedBrand);
    const modelData = brandData?.models.find((m: any) => m.model === model);
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

  // Função para atualizar a cor selecionada
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setEditingVehicle((prevVehicle) => ({
      ...prevVehicle!,
      color: color,
    }));
  };

  return (
    <>
    <ThemeProvider>
      <h1>Veículos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
        <button className="px-4 py-2 bg-green-500 hover:bg-green-200 transition-all hover:shadow-md text-2xl text-white rounded-full mb-4" onClick={handleAdd}>
          +
        </button>
      </div>

      {/* Modal de adicionar/editar */}
      {editingVehicle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="flex flex-col gap-8 bg-black/30 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-1/2">
            <div className="flex justify-start items-center bg-conecta-azul p-4 rounded-2xl">
              <h2 className="text-2xl font-thin">{isAdding ? "Adicionar Veículo" : "Editar Veículo"}</h2>
            </div>
            <div className="flex flex-col justify-start items-start bg-conecta-azul p-4 rounded-2xl">
              {/* Marca */}
              <label className="block">Marca:</label>
              <select 
                className="w-full border p-2 mb-2 rounded" 
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
              >
                <option value="">Selecione a marca</option>
                {vehicleData.brands.map((brandData: VehicleBrand, index) => (
                  <option key={index} value={brandData.brand}>{brandData.brand}</option>
                ))}
              </select>

              {/* Modelo */}
              <label className="block">Modelo:</label>
              <select 
                className="w-full border p-2 mb-2 rounded" 
                value={selectedModel}
                onChange={(e) => handleModelChange(e.target.value)}
              >
                <option value="">Selecione o modelo</option>
                {availableModels.map((modelData, index) => (
                  <option key={index} value={modelData.model}>{modelData.model}</option>
                ))}
              </select>

              {/* Ano */}
              <label className="block">Ano:</label>
              <select 
                className="w-full border p-2 mb-2 rounded" 
                value={editingVehicle.year}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
              >
                <option value="">Selecione o ano</option>
                {availableYears.map((yearData, index) => (
                  <option key={index} value={yearData.year}>{yearData.year}</option>
                ))}
              </select>

              {/* Categoria */}
              <label className="block">Categoria:</label>
              <input 
                type="text" 
                className="w-full border p-2 mb-2 rounded" 
                value={editingVehicle.category}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, category: e.target.value })}
              />
              {/* Motor */}
              <label className="block">Motor:</label>
              <input 
                type="text" 
                className="w-full border p-2 mb-2 rounded" 
                value={editingVehicle.motor}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, motor: e.target.value })}
              />

              {/* Cor */}
              <label className="block">Cor:</label>
              <select 
                className="w-full border p-2 mb-2 rounded" 
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
              >
                <option value="">Selecione a cor</option>
                <option value="Red">Vermelho</option>
                <option value="Blue">Azul</option>
                <option value="Black">Preto</option>
                <option value="White">Branco</option>
                <option value="Silver">Prata</option>
              </select>

              <div className="flex justify-center gap-2 items-center mt-4 w-full">
                <button 
                  className="px-4 py-2 bg-green-500 text-white rounded" 
                  onClick={() => handleSave(editingVehicle)}
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
                    setSelectedColor(""); // Limpar cor selecionada
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </ThemeProvider>
    </>
  );
}
