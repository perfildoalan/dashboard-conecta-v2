import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface GraphProps {
  title: string
  measure: string
  dataCarbono: number[] // Array de dados
  dataGhg: number // Array de dados
  timestamps: Date[] // Array de timestamps
}

export default function Co2LineChart({
  title,
  measure,
  timestamps,
  dataCarbono,
  dataGhg,
}: GraphProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  // Filtrar os dados para remover valores nulos
  const filteredDataCarbono = dataCarbono.filter((value) => value !== null)

  // function normalizeData(data: number[]): number[] {
  //   const min = Math.min(...data)
  //   const max = Math.max(...data)
  //   return data.map((value) => (value - min) / (max - min))
  // }

  // const dataCarbono = normalizeData(filteredDataCarbono)

  const filteredTimestamps = timestamps.filter(
    (_, index) => dataCarbono[index] !== null,
  )

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)

      // Calcular os limites mínimo e máximo dos dados
      const minData = Math.min(...dataCarbono)
      const maxData = Math.max(...dataCarbono)

      // Configuração do gráfico
      const option: echarts.EChartsOption = {
        legend: {
          left: 60,
          data: ['Emissão de CO2'],
        },
        xAxis: {
          type: 'time',
          name: 'Data/hora',
          axisLabel: {
            formatter: (value: number) => {
              const date = new Date(value)
              return date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                second: '2-digit',
              }) // Formatando o timestamp without AM or PM
            },
          },
        },
        yAxis: {
          type: 'value',
          name: title,
          min: minData, // Definir o limite mínimo do eixo y
          max: maxData, // Definir o limite máximo do eixo y
        },

        series: [
          {
            type: 'line',
            data: filteredTimestamps.map((time, index) => [
              time,
              dataCarbono[index],
            ]), // Mapeando valores de timestamp e da informação
            smooth: true, // Linha suavizada
            lineStyle: {
              color: '#00d01c', // Cor da linha do gráfico
            },
            itemStyle: {
              color: '#00d01c', // Cor das bolinhas do gráfico
            },
            name: 'Emissão de CO2',
          },
          // {
          //   type: 'line',
          //   data: filteredTimestamps.map((time) => [time, dataGhg]), // Mapeando valores de timestamp e da informação
          //   smooth: true, // Linha suavizada
          //   lineStyle: {
          //     color: '#005ed0', // Cor da linha do gráfico
          //   },
          //   itemStyle: {
          //     color: '#005ed0', // Cor das bolinhas do gráfico
          //   },
          //   name: 'Ghg',
          // },
        ],

        tooltip: {
          trigger: 'axis', // Tooltip ao passar o mouse sobre o eixo
          formatter: (params: any) => {
            const timestamp = new Date(params[0].data[0]).toLocaleTimeString() // Convertendo timestamp para hora
            const consumo: number = params[0].data[1]
            return `Horário: ${timestamp}<br/>
            <br/> Emissão de CO2: ${(consumo * 100).toFixed()} <br/> 
            ` // Informação do tooltip
          },
        },

        dataZoom: [
          {
            show: true,
            realtime: true,
          },
          {
            type: 'inside',
            realtime: true,
          },
        ],
      }

      // Definir a opção do gráfico
      chart.setOption(option)

      // Limpando o gráfico quando o componente é desmontado
      return () => {
        chart.dispose()
      }
    }
  }, [measure, filteredTimestamps, title, filteredDataCarbono, dataGhg])

  return (
    <>
      <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
    </>
  )
}
