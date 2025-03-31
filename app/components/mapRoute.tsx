import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
  } from 'react-leaflet'
  import L, { LatLngExpression } from 'leaflet'
  
  import IconStart from '@/assets/Images/icon-start.png'
  import IconEnd from '@/assets/Images/icon-end.png'
  import { useEffect } from 'react'
  
  interface MapRouteProps {
    location: LatLngExpression[]
    Co2?: number[] // Array de probabilidades correspondentes aos pontos de localização
    speed?: number[] // Array de velocidades correspondentes aos pontos de localização
    driverBehavior?: string[] // Array de comportamentos do motorista correspondentes aos pontos de localização
  }
  
const LegendContainer = () => (
    <div className="bg-white p-2 text-sm font-sans shadow-md rounded-md"/>

)
  
  interface LegendProps {
    Co2: boolean
    Driver: boolean
  }
  
  function Legend({ Co2, Driver }: LegendProps) {
    const map = useMap()
  
    useEffect(() => {
      const legend = new L.Control({ position: 'bottomright' })
  
      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend')
        const colors = ['#00FF00', '#ADFF2F', '#FFD700', '#FFA500', '#FF0000']
        const grades = ['Muito baixo', 'Baixo', 'Moderado', 'Alto', 'Muito alto']
        const labels = []
  
        // loop through our density intervals and generate a label with a colored square for each interval
        labels.push(
          `<strong>${Co2 ? "t('map-co2')" : Driver ? "t('map-driver-behavior') ": "t('map-speed')"}</strong> <br/>`,
        )
        if (Co2) {
          for (let i = 0; i < grades.length; i++) {
            labels.push(
              `
          <i style="background:${colors[i]}; padding-left: 13px; margin-right: 0.1rem; border-radius: 999px;"></i>
           ${grades[i]}${grades[i + 1] ? `<br>` : '+'}`,
            )
          }
        } else if (Driver) {
          const driverGrades = ['Cautious', 'Normal', 'Aggressive']
          const driverColors = ['#00abd0', '#00d01c', '#ff0000']
          for (let i = 0; i < driverGrades.length; i++) {
            labels.push(
              `
          <i style="background:${driverColors[i]}; padding-left: 13px; margin-right: 0.1rem; border-radius: 999px;"></i>
           ${driverGrades[i]}${driverGrades[i + 1] ? `<br>` : ''}`,
            )
          }
        } else {
          for (let i = 0; i < grades.length; i++) {
            labels.push(
              `
          <i style="background:${colors[i]}; padding-left: 13px; margin-right: 0.1rem; border-radius: 999px;"></i>
           ${grades[i]}${grades[i + 1] ? `<br>` : '+'}`,
            )
          }
        }
  
        div.innerHTML = labels.join('')
        return div
      }
  
      legend.addTo(map)
  
      return () => {
        legend.remove()
      }
    }, [map])
  
    return <LegendContainer />
  }
  
  function getColorForCo2(Co2: number): string {
    if (Co2 >= 0 && Co2 <= 1.5) {
      return '#00FF00'
    } else if (Co2 > 1.5 && Co2 <= 3) {
      return '#ADFF2F'
    } else if (Co2 > 3 && Co2 <= 4.5) {
      return '#FFD700'
    } else if (Co2 > 4.5 && Co2 <= 6) {
      return '#FFA500'
    }
    return '#FF0000' // Cor padrão caso a probabilidade esteja fora do intervalo esperado
  }
  
  const getColorForSpeed = (speed: number): string => {
    if (speed >= 0 && speed <= 30) {
      return '#00FF00'
    } else if (speed >= 31 && speed <= 60) {
      return '#ADFF2F'
    } else if (speed >= 61 && speed <= 90) {
      return '#FFD700'
    } else if (speed >= 91 && speed <= 119) {
      return '#FFA500'
    } else if (speed >= 120) {
      return '#FF0000'
    }
    return '#000000' // Cor padrão caso a probabilidade esteja fora do intervalo esperado
  }
  
  function getDriveBehaviorColor(driveBehavior: string): string {
    switch (driveBehavior) {
      case 'cautious':
        return '#00abd0'
      case 'normal':
        return '#00d01c'
      case 'aggressive':
        return '#ff0000'
      default:
        return '#000000'
    }
  }
  
  export default function MapRoute({
    location,
    Co2,
    speed,
    driverBehavior,
  }: MapRouteProps) {
    if (!location || location.length === 0) {
      return <div>Localização não disponível</div>
    }
  
    const markerIconStart = new L.Icon({
      iconUrl: IconStart.src,
      iconSize: [32, 42],
      iconAnchor: [12, 38],
      popupAnchor: [0, -30],
    })
  
    const markerIconEnd = new L.Icon({
      iconUrl: IconEnd.src,
      iconSize: [32, 42],
      iconAnchor: [12, 38],
      popupAnchor: [0, -30],
    })
  
    const firstPosition = location[0]
    const lastPosition = location[location.length - 1]
  
    // Dividir a linha em segmentos coloridos
    const segments = location.map((point, index) => {
      let color = 'blue' // Default color if both Co2 and speed are undefined
      if (Co2 && Co2[index] !== undefined) {
        color = getColorForCo2(Co2[index])
      } else if (speed && speed[index] !== undefined) {
        color = getColorForSpeed(speed[index])
      } else if (driverBehavior) {
        color = getDriveBehaviorColor(driverBehavior[index])
      }
      return { point, color }
    })
  
    return (
      <div className="">
        <MapContainer
          center={firstPosition}
          zoom={10}
          scrollWheelZoom={true}
          style={{
            width: '10%',
            height: 'calc(100vh - 4000px)',
            borderRadius: '10px',
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={firstPosition} icon={markerIconStart}>
            <Popup>Inicio</Popup>
          </Marker>
          <Marker position={lastPosition} icon={markerIconEnd}>
            <Popup>Fim</Popup>
          </Marker>
          {segments.map((segment, index) => {
            if (index < location.length - 1) {
              const nextPoint = location[index + 1]
              if (segment.point && nextPoint) {
                return (
                  <Polyline
                    key={index}
                    positions={[segment.point, nextPoint]}
                    color={segment.color}
                  />
                )
              }
            }
            return null
          })}
          <Legend Co2={!!Co2} Driver={!!driverBehavior} />
        </MapContainer>
      </div>
    )
  }
  