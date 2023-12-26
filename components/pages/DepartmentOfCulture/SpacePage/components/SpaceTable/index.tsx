import { Text, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import Table from 'components/Table'
import { getValidArray } from 'utils/common'
import { ISpaceTableData } from './constants'
import { getHeaderList } from './utils'

const SpaceTable = () => {
  const spaces: ISpaceTableData[] = [
    {
      id: 'a',
      format: 'Hình ảnh',
      long: 100,
      lat: 100,
      address: 'abc',
      isPlanned: true,
      wardId: 'abc'
    },
    {
      id: 'b',
      format: 'Hình ảnh',
      long: 100,
      lat: 100,
      address: 'abc',
      isPlanned: true,
      wardId: 'abc'
    }
  ]
  const tableData: ISpaceTableData[] = getValidArray(spaces).map(space => {
    function navigateAccountDetail(): void {
      // TODO: navigate to account detail page lateer
      // router.push(`/fleet-manager/case-detail/${caseDetail?.caseId}`)
    }

    return {
      ...space,
      onClick: navigateAccountDetail
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
        Danh sách bảng quảng cáo
      </Text>
      <Table headerList={getHeaderList()} tableData={tableData} />
    </VStack>
  )
}

export default observer(SpaceTable)
