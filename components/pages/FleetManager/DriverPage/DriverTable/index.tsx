import { Avatar, Button, Tag } from '@chakra-ui/react'
import Table, { IPagination } from 'components/Table'
import { DriverProfileStatusEnum } from 'enums/driverProfileStatus'
import { useStores } from 'hooks/useStores'
import { IDriver } from 'interfaces/driver'
import get from 'lodash/get'
import { observer } from 'mobx-react'
import router from 'next/router'
import routes from 'routes'
import { getQueryValue, getValidArray } from 'utils/common'
import { IDriverTableData } from './constant'
import { getHeaderList } from './utils'

export interface IDriverTableProps {
  pageSize?: number
  fetchDriversPageData?: (page: number) => void
}

const DriverTable = (props: IDriverTableProps) => {
  const { pageSize, fetchDriversPageData } = props
  const { driverStore } = useStores()
  const { drivers } = driverStore
  const { results: driverList, totalCount: tableLength } = drivers
  const currentFleetId: string = get(router, 'query.fleetId')
  const pageIndex: number = getQueryValue(router, 'page', 1)

  const dataInTable: IDriverTableData[] = getValidArray(driverList).map((driver: IDriver) => {
    function navigateVehicleDetail(driverId: string): void {
      // TODO: implement later
    }

    return {
      avatar: <Avatar src={driver?.driverProfile?.profileImage} size="sm" />,
      driverName: driver?.driverProfile?.name ?? 'N/A',
      driverPhone: driver?.driverProfile?.phone ?? 'N/A',
      driverEmail: driver?.email ?? 'N/A',
      status:
        driver?.driverProfile?.status === DriverProfileStatusEnum.UN_ACTIVE ? (
          <Tag backgroundColor="gray.200" borderRadius={16} paddingX="6px" color="gray.700">
            Inactive
          </Tag>
        ) : (
          <Tag backgroundColor="green.200" borderRadius={16} paddingX="6px">
            Active
          </Tag>
        ),
      action: (
        <Button
          size="sm"
          background="white"
          border="1px solid #A9A9A9"
          onClick={() => {
            navigateVehicleDetail(driver?.id as string)
          }}
        >
          View
        </Button>
      )
    }
  })

  const pagination: IPagination = { pageIndex, tableLength, gotoPage }

  function gotoPage(page: number): void {
    router.push(`${routes.fleetManager.drivers.value}?page=${Math.max(page, 1)}`)
    fetchDriversPageData?.(page)
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

export default observer(DriverTable)
