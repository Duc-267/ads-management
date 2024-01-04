import { Text, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import Table from 'components/Table'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './utils'
import { ISurfacesTableData } from './constants'

const SurfacesTable = () => {
  const spaces: ISurfacesTableData[] = [
    {
      id: 'a',
      format: 'Hình ảnh',
      width: 100,
      height: 100,
      spaceId: 'abc'
    },
    {
      id: 'b',
      format: 'Hình ảnh',
      width: 100,
      height: 100,
      spaceId: 'abc'
    }
  ]
  const tableData: ISurfacesTableData[] = getValidArray(spaces).map(space => {
    function navigateSpaceDetail(): void {
      // TODO: navigate to account detail page lateer
      // router.push(`/fleet-manager/case-detail/${caseDetail?.caseId}`)
    }

    return {
      ...space,
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
        Danh sách điểm quảng cáo
      </Text>
      <Table headerList={getHeaderList()} tableData={tableData} />
    </VStack>
  )
}

export default observer(SurfacesTable)
