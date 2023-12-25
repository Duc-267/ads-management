import { HStack, VStack, useToast } from '@chakra-ui/react'
import get from 'lodash/get'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import React from 'react'
import withAuth from 'HOCs/withAuth'
import { useStores } from 'hooks/useStores'
import ActivityLog from './components/ActivityLog'
import IncidentOverview from './components/IncidentOverview'
import UrgentCases from './components/UrgenCases'

const HomePage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { fleetStore } = useStores()
  const router = useRouter()
  const { fleets } = fleetStore
  const currentFleetId: string = get(router, 'query.fleetId')
  const toast = useToast()

  // async function fetchFleets(): Promise<void> {
  //   try {
  //     setIsLoading(true)
  //     await fleetStore.fetchFleets()
  //     await fleetStore.fetchUrgentCases(currentFleetId)
  //     await fleetStore.fetchActivityLogs(currentFleetId)
  //     setIsLoading(false)
  //   } catch (error) {
  //     toast({
  //       description: 'Something went wrong',
  //       status: 'error',
  //       duration: 2000,
  //       isClosable: true
  //     })
  //   }
  // }

  // useEffect(
  //   function fetchData() {
  //     if (currentFleetId) {
  //       fetchFleets()
  //     }
  //   },
  //   [currentFleetId]
  // )

  // if (isLoading) {
  //   return (
  //     <Stack width="full" minH="100vh" height="full" alignItems="center" justifyContent="center">
  //       <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  //     </Stack>
  //   )
  // }

  return (
    <VStack marginLeft={0} width="full" paddingX={4} paddingTop={6}>
      <VStack width="full" spacing={4}>
        <HStack width="full" spacing={5} margin={0} justifyContent="space-between">
          <UrgentCases />
          <ActivityLog />
        </HStack>
        <IncidentOverview />
      </VStack>
    </VStack>
  )
}

export default observer(withAuth(HomePage))
