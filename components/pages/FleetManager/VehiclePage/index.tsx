import { HStack, VStack, Toast, Text, Box, useToast } from '@chakra-ui/react'
import { identity } from 'lodash'
import get from 'lodash/get'
import pickBy from 'lodash/pickBy'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { createVehicle } from 'API/vehicle'
import ButtonWithIcon from 'components/ButtonWithIcon'
import { VehicleStatusEnum } from 'enums/vehicleStatus'
import withAuth from 'HOCs/withAuth'
import { useStores } from 'hooks/useStores'
import { IVehicle } from 'interfaces/vehicle'
import routes from 'routes'
import { IFilter } from 'types/common'
import { getQueryValue } from 'utils/common'
import { IVehicleQueryParams } from './constants'
import VehicleFilter from './VehicleFilter'
import VehicleTable from './VehicleTable'
import { VehicleModal } from '../components/AddEditVehicleModal'
import AddEditVehicleForm from '../components/AddEditVehicleModal/AddEditVehicleForm'

export interface IFilterForm {
  date?: Date
  insuredBy?: string
  model?: string
  make?: string
  status?: VehicleStatusEnum
  yearOfManufacture?: number
}

const VehiclePage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { fleetStore, vehicleStore } = useStores()
  const router = useRouter()
  const { query } = router
  const { fleets } = fleetStore
  const currentFleetId: string = get(router, 'query.fleetId')
  const statusFilter: VehicleStatusEnum = get(router, 'query.status')
  const pageIndex: number = getQueryValue(router, 'page', 1)
  const pageSize: number = 10
  const formRef = useRef<HTMLFormElement>(null)
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)

  async function fetchFleets(): Promise<void> {
    try {
      setIsLoading(true)
      await fleetStore.fetchFleets()
      setIsLoading(false)
    } catch (error) {
      Toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  async function fetchVehiclesPageData(page: number = pageIndex): Promise<void> {
    setIsLoading(true)
    try {
      const filter: IFilter<IVehicle> = {
        where: statusFilter ? { status: statusFilter } : {},
        skip: (page - 1) * pageSize,
        limit: pageSize
      }
      await vehicleStore.fetchVehicles(currentFleetId, filter)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      Toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  function setQueryParams(queryParams: IVehicleQueryParams): void {
    router.push({
      pathname: `${routes.fleetManager.vehicles.value}`,
      query: {
        page: pageIndex,
        ...pickBy(queryParams, identity)
      }
    })
  }

  const handleSubmit = async (data: IVehicle) => {
    setIsSubmitting(true)
    try {
      const res = await createVehicle({
        ...data,
        fleetIds: [currentFleetId]
      })
      if (res?.id) {
        toast({
          description: 'Create Vehicle successfully',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
        setIsOpenModal(false)
        router.reload()
      } else {
        toast({
          description: 'Create Vehicle failed',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        description: 'Create Vehicle failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }

    setIsSubmitting(false)
  }

  useEffect(
    function fetchData() {
      if (currentFleetId) {
        fetchVehiclesPageData()
      }
    },
    [query, currentFleetId, pageIndex]
  )

  useEffect(
    function fetchData() {
      if (currentFleetId) {
        fetchFleets()
      }
    },
    [currentFleetId]
  )

  // if (isLoading) {
  //   return (
  //     <Stack width="full" minH="100vh" height="full" alignItems="center" justifyContent="center">
  //       <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  //     </Stack>
  //   )
  // }

  return (
    <VStack margin={0} width="full" paddingX={4} paddingTop={6} paddingBottom={12} spacing={4}>
      <VStack
        paddingX={3}
        paddingTop={4}
        height="full"
        width="full"
        background="white"
        border="1px solid #E8E8E8"
        borderRadius="12px"
        alignItems="flex-start"
      >
        <Text fontSize="18px" fontWeight="bold">
          Vehicles
        </Text>
        <HStack width="full" spacing={4} margin={0} marginBottom={5} justifyContent="space-between">
          <VehicleFilter setQueryParams={setQueryParams} />
          <ButtonWithIcon
            size={16}
            label="Add Vehicle"
            iconName="ic-add.svg"
            onClick={() => {
              setIsOpenModal(true)
            }}
          />
        </HStack>
        <Box width="full" height="1px" background="#E8E8E8" marginBottom={5} />
        <VehicleTable pageSize={pageSize} fetchVehiclesPageData={fetchVehiclesPageData} />
      </VStack>

      <VehicleModal
        isLoading={isSubmitting}
        title="Add new vehicle"
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false)
        }}
        secondaryText="Add Vehicle"
        onSecondaryClick={() => {
          formRef.current && formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }}
      >
        <AddEditVehicleForm formRef={formRef} onSubmit={handleSubmit} />
      </VehicleModal>
    </VStack>
  )
}

export default observer(withAuth(VehiclePage))
