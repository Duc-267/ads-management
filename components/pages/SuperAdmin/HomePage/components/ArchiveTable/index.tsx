import { Box, Button, Spinner, useToast } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { IFleetCompanyView } from 'interfaces/fleet'
import { getValidArray } from 'utils/common'
import { IArchivedTableData } from './constants'
import { getHeaderList } from './utils'

const ArchiveTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const toast = useToast()
  const { superAdminStore } = useStores()
  const { fleetCompanies } = superAdminStore
  const archivedFleetCompanies: IFleetCompanyView[] = getValidArray(fleetCompanies).filter(
    (fleetCompany: IFleetCompanyView) => fleetCompany?.isDeleted
  )

  async function fetchFleetCompanies(): Promise<void> {
    setIsLoading(true)
    try {
      await superAdminStore.getFleetCompany()
      setIsLoading(false)
    } catch (error) {
      toast({
        status: 'error',
        description: 'There was an error. Please try again.'
      })
      setIsLoading(false)
    }
  }

  async function handleUnarchiveFleet(id: string): Promise<void> {
    try {
      await superAdminStore.unarchiveFleetCompany(id)
      toast({
        status: 'success',
        description: 'Fleet company unarchived successfully'
      })
      fetchFleetCompanies()
    } catch (error) {
      toast({
        status: 'error',
        description: 'There was an error. Please try again.'
      })
    }
  }

  useEffect(function fetchData() {
    fetchFleetCompanies()
  }, [])

  if (isLoading) {
    return (
      <Box w="100%">
        <Spinner />
      </Box>
    )
  }

  const tableData: IArchivedTableData[] = getValidArray(archivedFleetCompanies).map(fleetCompany => {
    return {
      ...fleetCompany,
      action: (
        <Button
          size="sm"
          border="1px solid"
          borderColor="gray.400"
          color="gray.900"
          background="white"
          fontWeight={500}
          onClick={() => handleUnarchiveFleet(fleetCompany?.id)}
        >
          Unarchive
        </Button>
      )
    }
  })
  return <Table headerList={getHeaderList()} tableData={tableData} />
}

export default observer(ArchiveTable)
