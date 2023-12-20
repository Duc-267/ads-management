import { HStack, Select, chakra } from '@chakra-ui/react'
import { VehicleStatusEnum } from 'enums/vehicleStatus'
import { IFilterItem } from 'interfaces/common'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import { getValidArray } from 'utils/common'
import { statusOptions } from './constants'
import { IVehicleQueryParams } from '../constants'
import { getQueryParamsFromUrl } from '../utils'

export interface IVehicleFilterProps {
  setQueryParams: (data: IVehicleQueryParams) => void
}

const VehicleFilter = (props: IVehicleFilterProps) => {
  const { setQueryParams } = props
  const router = useRouter()
  const { query } = router
  const statusFilter: string = get(router, 'query.status')

  return (
    <HStack>
      <Select
        maxWidth="200px"
        borderRadius="6px"
        background="white"
        onChange={event => {
          const previousQuery: IVehicleQueryParams = getQueryParamsFromUrl(query)
          const newQuery: IVehicleQueryParams = {
            ...previousQuery,
            status: event.target.value as VehicleStatusEnum
          }
          setQueryParams(newQuery)
        }}
        placeholder="Status"
        value={statusFilter}
      >
        {getValidArray(statusOptions).map((statusOption: IFilterItem) => (
          <chakra.option key={statusOption?.value} value={statusOption?.value}>
            {statusOption?.title}
          </chakra.option>
        ))}
      </Select>
    </HStack>
  )
}

export default VehicleFilter
