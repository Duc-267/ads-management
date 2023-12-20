import { Tag, Text, VStack } from '@chakra-ui/react'
import Table from 'components/Table'
import { ActivityActionTypeEnum } from 'enums/activity'
import { useStores } from 'hooks/useStores'
import { IActivityLog } from 'interfaces/activityLog'
import omit from 'lodash/omit'
import { observer } from 'mobx-react'
import { getValidArray } from 'utils/common'
import { IActivityLogTableData } from './constants'
import { getHeaderList } from './utils'

const ActivityLog = () => {
  const { fleetStore } = useStores()
  const { activityLogs } = fleetStore
  const tableData: IActivityLogTableData[] = getValidArray(activityLogs).map((activityLog: IActivityLog) => {
    function navigateCaseDetail(): void {
      // TODO: navigate to case detail page lateer
      // router.push(`/fleet-manager/case-detail/${activityLog?.caseId}`)
    }

    function getActivity(): JSX.Element {
      switch (activityLog?.activity) {
        case ActivityActionTypeEnum.ADD:
          return (
            <Tag backgroundColor="green.200" borderRadius={16} paddingX="6px">
              Add
            </Tag>
          )
        case ActivityActionTypeEnum.EDIT:
          return (
            <Tag backgroundColor="red.200" borderRadius={16} paddingX="6px" color="red.700">
              Edit
            </Tag>
          )
        case ActivityActionTypeEnum.SUBMIT:
          return (
            <Tag backgroundColor="blue.200" borderRadius={16} paddingX="6px" color="blue.700">
              Submit
            </Tag>
          )
        case ActivityActionTypeEnum.LOGOUT:
          return (
            <Tag backgroundColor="gray.200" borderRadius={16} paddingX="6px" color="gray.700">
              Logout
            </Tag>
          )
        case ActivityActionTypeEnum.DELETE:
          return (
            <Tag backgroundColor="red.200" borderRadius={16} paddingX="6px" color="red.700">
              Delete
            </Tag>
          )
        default:
          return <></>
      }
    }

    return {
      ...omit(activityLog, 'action'),
      activity: getActivity(),
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
        Activity Log
      </Text>
      <Table headerList={getHeaderList()} tableData={tableData} />
    </VStack>
  )
}

export default observer(ActivityLog)
