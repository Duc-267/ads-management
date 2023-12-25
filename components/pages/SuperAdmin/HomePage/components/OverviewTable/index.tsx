import { Spinner, Stack } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { IFleetCompanyView } from 'interfaces/fleet'
import { getValidArray } from 'utils/common'
import { IOverviewTableData } from './constants'
import { getHeaderList } from './utils'

interface IOverviewTable {
  handleRowClick: (value: string) => void
}

const OverviewTable = ({ handleRowClick }: IOverviewTable) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { superAdminStore } = useStores()
  const { fleetCompanies } = superAdminStore
  const unarchivedFleetCompanies: IFleetCompanyView[] = useMemo(() => {
    return getValidArray(fleetCompanies).filter((fleetCompany: IFleetCompanyView) => !fleetCompany?.isDeleted)
  }, [fleetCompanies])

  async function fetchFleetCompanies(): Promise<void> {
    setIsLoading(true)
    try {
      await superAdminStore.getFleetCompany()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(function fetchData() {
    fetchFleetCompanies()
  }, [])

  if (isLoading) {
    return (
      <Stack w="full" h="full">
        <Spinner />
      </Stack>
    )
  }

  const tableData: IOverviewTableData[] = getValidArray(unarchivedFleetCompanies)?.map(
    (fleetCompany: IFleetCompanyView) => {
      return {
        ...fleetCompany,
        onClick: () => handleRowClick(fleetCompany.id)
      }
    }
  )

  return <Table headerList={getHeaderList()} tableData={tableData} />
}

export default observer(OverviewTable)
