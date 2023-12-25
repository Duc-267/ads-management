import { Box } from '@chakra-ui/react'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAllIncidents } from 'API/fleet'
import BarChart, { EValueFilter, IDataChart } from 'components/BarChart'
import { formatDateChart } from 'components/BarChart/utils'

const IncidentOverview = () => {
  const router = useRouter()
  const fleetId = get(router, 'query.fleetId')
  const [valueFilter, setValueFilter] = useState(EValueFilter.Month)
  const [dataChart, setDataChart] = useState<IDataChart[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllIncidents(fleetId, valueFilter)
      const formatResponse = response.map(i => ({ ...i, date: formatDateChart(get(i, 'date'), 'DD/MM') }))
      setDataChart(formatResponse)
    }
    if (fleetId) {
      fetchData()
    }
  }, [valueFilter, fleetId])
  return (
    <Box width="full" background="white" borderRadius="6px" padding="20px">
      <BarChart
        hasIncidentAction
        valueFilter={valueFilter}
        dataChart={dataChart as IDataChart[]}
        handleSelectChange={e => {
          setValueFilter(get(e, 'target.value') as EValueFilter)
        }}
      />
    </Box>
  )
}

export default IncidentOverview
