'use client'
import { LatLngExpression } from 'leaflet'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import CardOptions from './components/cardOptions'

import CarOption from '@/assets/Images/option-car.svg'
import TripOption from '@/assets/Images/option-route.svg'
import ReportOption from '@/assets/Images/option-report.svg'
import CO2Option from '@/assets/Images/fluent_leaf-two-16-filled.svg'
import CardInfoDash from './components/cardInfoDash'
import MapRoute from '@/components/mapRoute'
import CardOptionsDownload from './components/cardOptionDowload'

interface speedProps {
  series: number[]
  statistics: {
    avg: number
    max: number
  }
}

export interface LastTripSummaryProps {
  emission_by_km: number
  fuel_model_prediction_prob: number | null
  fuel_prediction: string
  location: LatLngExpression[]
  speed: speedProps
  time_session: string
  total_distance: number
  total_time: number
}

export default function DashboardPage() {
  const [freematrics, setFreematrics] = useState<LastTripSummaryProps>()
  const [hasData, setHasData] = useState<boolean>(false)
  const [firstAccess, setFirstAccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+'/v1/user-area/trip/last-trip-summary')
      .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
      })
      .then((data) => {
      setFirstAccess(false)
      setHasData(true)
      const location = data.location || []
      const filteredLocation = location.filter((coord: LatLngExpression[]) =>
        coord.every((item: LatLngExpression) => item !== null),
      )
      setFreematrics({ ...data, location: filteredLocation })
      setLoading(false)
      })
      .catch((error) => {
      if (error.status === 404) {
        fetch(process.env.NEXT_PUBLIC_API_BASE_URL+'/v1/trips/last-trip-summary?app_id=2')
        .then((response) => {
          if (!response.ok) {
          throw response
          }
          return response.json()
        })
        .then((data) => {
          setFirstAccess(false)
          setHasData(true)
          const location = data.location || []
          const filteredLocation = location.filter(
          (coord: LatLngExpression[]) =>
            coord.every((item: LatLngExpression) => item !== null),
          )
          setFreematrics({ ...data, location: filteredLocation })
          setLoading(false)
        })
      }
      })

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+'/v1/user-area/vehicle/user-vehicles')
      .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
      })
      .then((data) => {
      if (data.length > 0) {
        setLoading(false)
        setFirstAccess(false)
      }
      })
      .catch((error) => {
      if (error.status === 404) {
        setLoading(false)
      }
      })
  }, [])

  return (
    <>
  {loading ? (
    <div className='w-full h-[calc(100vh-80px)] flex justify-center items-center'>
      <div className='w-full h-full flex justify-center items-center' >
        <p className="text-[5rem] font-semibold text-gray-500 mt-0 text-center">
          Carregando os dados da ultima viagem...
        </p>
      </div>
    </div>
  ) : firstAccess === true ? (
    <>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)]">
        <p className="text-[4rem] font-medium mt-0 mb-[15px]">
          Primeiro acesso
        </p>
        <p className="text-[2rem] font-normal text-gray-500 mt-0">
          Registre seu carro e comece a usar o app
        </p>
        <div className="flex mb-[40px] ">
          <CardOptions image={CarOption.src} text="veículos" />
          <CardOptions image={TripOption.src} text="Viagens" />
          <CardOptions image={CO2Option.src} text="Co2" />
          <CardOptions image={ReportOption.src} text="Reports" />
        </div>
        <Button
          className="bg-[#01AAD0] h-[45px] rounded-[15px] text-[1rem] shadow-none p-6"
        >
          Start button
        </Button>
      </div>
    </>
  ) : hasData === true ? (
    <div className="flex bg-red-400 items-start md:w-full">

      <div className="w-full h-full">

        <div className="flex justify-between mt-[20px] px-[50px] md:flex">
          <p className="text-[20px] font-semibold">
           Last trip
          </p>
          <div className="flex items-center">
            <button
              className="bg-[#01AAD0] border border-[#01AAD0] text-white px-[10px] py-[7px] flex items-center justify-center rounded-[5px] font-medium transition duration-300 hover:bg-white hover:border-gray-400 hover:text-black mr-[10px]"

            >
              Icone
            </button>
            <button
              className="bg-[#01AAD0] border border-[#01AAD0] text-white px-[10px] py-[7px] flex items-center justify-center rounded-[5px] font-medium transition duration-300 hover:bg-white hover:border-gray-400 hover:text-black"
            >
              Icone 2
            </button>
          </div>
        </div>
        <div className="flex justify-between mx-[30px] mt-[20px] md:grid md:grid-cols-2 md:gap-[20px] md:justify-center md:items-center md:mx-0">
          <CardInfoDash
            title="Distancia Viajada"
            value={freematrics?.total_distance.toFixed(0)}
            measure="km"
          />
          <CardInfoDash
            title="Velocidade media"
            value={freematrics?.speed.statistics.avg.toFixed(0)}
            measure="km/h"
          />
          <CardInfoDash
            title="Velocidade maxima"
            value={freematrics?.speed.statistics.max}
            measure="km/h"
          />
          <CardInfoDash
            title="CO2 Emitido"
            value={freematrics?.emission_by_km.toFixed(0)}
            measure="g/km"
          />
          <CardInfoDash
            title="Tipo do combustível"
            value={
              freematrics?.fuel_prediction === 'gasoline'
                ? "Gasolina"
                : "Etanol"
            }
            measure=""
            percentage={freematrics?.fuel_model_prediction_prob}
          />
        </div>
        {freematrics?.location && (
          <MapRoute
            location={freematrics?.location}
            speed={freematrics.speed.series}
          />
        )}
      </div>
    </div>
  ) : (
    hasData === false && (
      <div className="grid grid-cols-[auto_1fr] grid-rows-[calc(100vh-95px)] items-start md:w-full">
        <div className="">
          <div className="flex flex-col justify-center items-center h-[calc(100vh-95px)]">
            <p className="text-[4rem] font-medium mt-0 mb-[15px]">
              Viagens
            </p>
            <p className="text-[2rem] font-normal text-gray-500 mt-0 text-center ">
              Subtitle
            </p>
            <div className="flex mb-[40px]">
              <CardOptionsDownload
                image="bxs:car"
                text="App2Car"
                pdf={process.env.NEXT_PUBLIC_API_BASE_URL+'/how-to/app2car'}
              />
              <CardOptionsDownload
                image="uil:circuit"
                text="SmartScan"
                pdf={process.env.NEXT_PUBLIC_API_BASE_URL+'/how-to/freematics'}
              />
            </div>
          </div>
        </div>
      </div>
    )
  )}
</>
  )
}
