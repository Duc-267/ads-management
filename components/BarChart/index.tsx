import { Flex, Text } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { get } from 'lodash'
import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import * as S from './styles'

export interface IDataChart {
  date: string
  total: number
}

export interface IBarChartProps {
  valueFilter: EValueFilter
  dataChart: IDataChart[]
  handleSelectChange?: React.ChangeEventHandler<HTMLSelectElement>
  hasIncidentAction?: boolean
}

export enum EValueFilter {
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

ChartJS.register(ChartDataLabels, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const defaultOptions = {
  responsive: true,
  aspectRatio: 6,
  plugins: {
    legend: {
      display: false
    },
    // Custom plugin to display bar values
    datalabels: {
      display: true,
      anchor: 'end',
      align: 'top',
      formatter: function (value: number) {
        return value.toString() // Customize the label format as needed
      },
      font: {
        weight: 'bold' // Customize the font weight of the labels
      }
    }
  },
  scales: {
    x: {
      ticks: {
        autoSkip: false // Prevent labels from being skipped
      },
      grid: {
        display: false // Hide x-axis grid lines
      }
    },
    y: {
      gridLines: {
        display: false // Hide the main y-axis line
      },
      ticks: {
        display: true
      }
    }
  }
}

const BarChart: React.FunctionComponent<IBarChartProps> = (props: IBarChartProps) => {
  const { dataChart, valueFilter, handleSelectChange, hasIncidentAction = false } = props

  const data = React.useMemo(() => {
    return {
      labels: dataChart.map((bar: IDataChart) => bar.date),
      datasets: [
        {
          label: 'Dataset 1',
          data: dataChart.map((bar: IDataChart) => bar.total),
          backgroundColor: '#EF7A37'
        }
      ]
    }
  }, [valueFilter, dataChart])

  const customOptions = React.useMemo(() => {
    if (valueFilter === EValueFilter.Month) {
      return {
        ...defaultOptions,
        scales: {
          ...get(defaultOptions, 'scales.', {}),
          x: {
            ...get(defaultOptions, 'scales.x', {}),
            ticks: {
              maxRotation: 90,
              minRotation: 90
            }
          }
        }
      }
    }
    return { ...defaultOptions }
  }, [valueFilter])

  return (
    <>
      {hasIncidentAction && (
        <Flex justify="space-between" align="center" marginBottom="16px">
          <Text fontWeight="bold" fontSize="18px">
            Incident Overview
          </Text>
          <S.DropdownWrapper>
            <Select value={valueFilter} onChange={handleSelectChange}>
              <option value={EValueFilter.Week}>Last 7 days</option>
              <option value={EValueFilter.Month}>Current month</option>
              <option value={EValueFilter.Year}>This year</option>
            </Select>
          </S.DropdownWrapper>
        </Flex>
      )}

      <Bar options={customOptions as any} data={data} />
    </>
  )
}

export default BarChart
