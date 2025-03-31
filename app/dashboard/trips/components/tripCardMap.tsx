interface TripCardMapProps {
    title: string
    mapData : string
    size: string
}

export default function TripCardMap ({ title, mapData} :TripCardMapProps) {
    return (
        <div className=" flex flex-col justify-between h-20 m-3 bg-muted-foreground rounded-xl">
                  <h2 className="text-xl font-thin bg-conecta-azul w-full rounded-t-xl px-4">{title}</h2>
                  <p className="text-sm text-gray-500  flex items-center justify-center h-full">{mapData}</p>
                </div>
    )
}