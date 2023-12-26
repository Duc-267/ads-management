import { Text, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import Table from 'components/Table'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './utils'
import { ISurfacesRequestTableData } from './constants'

const SurfacesRequestTable = () => {
  const surfaces: ISurfacesRequestTableData[] = [
  ]
  const tableData: ISurfacesRequestTableData[] = getValidArray(surfaces).map(surface => {
    function navigateSpaceDetail(): void {
      // TODO: navigate to account detail page lateer
      // router.push(`/fleet-manager/case-detail/${caseDetail?.caseId}`)
    }

    return {
      ...surface,
      onClick: navigateSpaceDetail
    }
  })

  return (
    <VStack
      spacing={2}
      width="full"
      height="400px"
      background="white"
      borderRadius={12}
      padding={5}
      alignItems="flex-start"
    >
      <Text fontSize="18px" fontWeight="bold">
        Danh sách yêu cầu điểm quảng cáo
      </Text>
      <Table headerList={getHeaderList()} tableData={tableData} />
    </VStack>
  )
}

export default observer(SurfacesRequestTable)
