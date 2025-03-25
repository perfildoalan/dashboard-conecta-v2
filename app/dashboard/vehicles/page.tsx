import VehicleCard from "./ui/vehicle-card";

export default function Vehicles() {
    return (
    <>
    <h1>Veiculos</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <VehicleCard color="black" brand="Chevrolet" model="Prisma" year={2011} category="Seda" motor="1.4">
      </VehicleCard>
      <VehicleCard color="green" brand="Chevrolet" model="Prisma" year={2011} category="Seda" motor="1.4">
      </VehicleCard>
      <VehicleCard color="blue" brand="Chevrolet" model="Prisma" year={2011} category="Seda" motor="1.4">
      </VehicleCard>
      <VehicleCard color="yellow" brand="Chevrolet" model="Prisma" year={2011} category="Seda" motor="1.4">
      </VehicleCard>
    </div>
    </>
  )
  }
  