import { Text, VStack } from '@chakra-ui/react'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { ICaseDetail } from 'interfaces/case'
import { observer } from 'mobx-react'
import { getValidArray } from 'utils/common'
import { IUrgentCaseTableData } from './constants'
import { getHeaderList } from './utils'

const UrgentCases = () => {
  const { fleetStore } = useStores()
  const { cases } = fleetStore
  const tableData: IUrgentCaseTableData[] = getValidArray(cases).map((caseDetail: ICaseDetail) => {
    function navigateCaseDetail(): void {
      // TODO: navigate to case detail page lateer
      // router.push(`/fleet-manager/case-detail/${caseDetail?.caseId}`)
    }

    return {
      ...caseDetail,
      dateOfIncident: caseDetail?.incidentDate,
      timeOfIncident: caseDetail?.incidentTime,
      flag: <Icon iconName="ic-red-flag.svg" alt="red-flag" width={16} height={16} />,
      onClick: navigateCaseDetail
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
        Urgent New Cases
      </Text>
      <Table headerList={getHeaderList()} tableData={tableData} />
    </VStack>
  )
}

export default observer(UrgentCases)
