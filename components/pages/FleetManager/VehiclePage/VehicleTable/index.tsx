import { Button, Switch, Tag } from '@chakra-ui/react'
import Table, { IPagination } from 'components/Table'
import { VehicleStatusEnum } from 'enums/vehicleStatus'
import { useStores } from 'hooks/useStores'
import { IVehicle } from 'interfaces/vehicle'
import get from 'lodash/get'
import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'
import { observer } from 'mobx-react'
import router from 'next/router'
import routes from 'routes'
import { getQueryValue, getValidArray } from 'utils/common'
import { IVehicleTableData } from './constant'
import { getHeaderList } from './utils'
import { getQueryParamsFromUrl } from '../utils'

export interface IVehicleTableProps {
  pageSize?: number
  fetchVehiclesPageData?: (page: number) => void
}

const VehicleTable = (props: IVehicleTableProps) => {
  const { pageSize, fetchVehiclesPageData } = props
  const { vehicleStore } = useStores()
  const { vehicles } = vehicleStore
  const { results: vehicleList, totalCount: tableLength } = vehicles
  const currentFleetId: string = get(router, 'query.fleetId')
  const pageIndex: number = getQueryValue(router, 'page', 1)
  const { query } = router

  const dataInTable: IVehicleTableData[] = getValidArray(vehicleList).map((vehicle: IVehicle) => {
    function navigateVehicleDetail(): void {
      // router.push(routes.fleetManager.vehicleDetail.value(vehicle?.id))
    }

    return {
      ...vehicle,
      status:
        vehicle?.status === VehicleStatusEnum.ACTIVE ? (
          <Tag backgroundColor="green.200" borderRadius={16} paddingX="6px">
            Active
          </Tag>
        ) : (
          <Tag backgroundColor="gray.200" borderRadius={16} paddingX="6px" color="gray.700">
            Inactive
          </Tag>
        ),
      dashCam: <Switch size="lg" defaultChecked={vehicle?.hasDashCam} />,
      action: (
        <Button size="sm" background="white" border="1px solid #A9A9A9" onClick={navigateVehicleDetail}>
          View
        </Button>
      )
    }
  })

  const pagination: IPagination = { pageIndex, tableLength, gotoPage }
  function gotoPage(page: number): void {
    const currentQueryParams = getQueryParamsFromUrl(query)
    router.push({
      pathname: `${routes.fleetManager.vehicles.value}`,
      query: {
        page: Math.max(page, 1),
        ...pickBy(currentQueryParams, identity)
      }
    })
    fetchVehiclesPageData?.(page)
  }
  return (
    <Table
      tableData={dataInTable}
      headerList={getHeaderList()}
      pagination={pagination}
      pageSize={pageSize}
      includePagination
    />
  )
}

export default observer(VehicleTable)
