import { HStack, VStack, Stack, Spinner, Toast, Text, Box, useToast } from '@chakra-ui/react'
import get from 'lodash/get'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { createDriver, uploadFile } from 'API/driver'
import ButtonWithIcon from 'components/ButtonWithIcon'
import { DriverProfileStatusEnum } from 'enums/driverProfileStatus'
import withAuth from 'HOCs/withAuth'
import { useStores } from 'hooks/useStores'
import { EDriverRole, IDriver, IDriverCreateParams, IDriverProfile } from 'interfaces/driver'
import { IFilter } from 'types/common'
import { getQueryValue } from 'utils/common'
import DriverTable from './DriverTable'
import { DriverModal } from '../components/AddEditDriverModal'
import AddEditDriverForm from '../components/AddEditDriverModal/AddEditDriverForm'

const DriverPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { fleetStore, driverStore } = useStores()
  const router = useRouter()
  const { fleets } = fleetStore
  const currentFleetId: string = get(router, 'query.fleetId')
  const pageIndex: number = getQueryValue(router, 'page', 1)
  const pageSize: number = 10
  const formRef = useRef<HTMLFormElement>(null)
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

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

  async function fetchDriversPageData(page: number = pageIndex): Promise<void> {
    setIsLoading(true)
    try {
      const filter: IFilter<IDriver> = {
        skip: (page - 1) * pageSize,
        limit: pageSize
      }
      await driverStore.fetchDrivers(currentFleetId, filter)
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
  const toast = useToast()

  const handleSubmit = async (data: Partial<IDriverProfile>) => {
    setIsSubmitting(true)
    const postImageResult = data?.file ? await uploadFile({ file: data.file }) : ''
    delete data.file
    if (!postImageResult) {
      toast({
        description: `Can't set you avatar profile.`,
        status: 'error'
      })
      setIsSubmitting(false)
      return
    }
    const createDriverBody: IDriverCreateParams = {
      email: data.email as string,
      fleetId: currentFleetId,
      role: EDriverRole.DRIVER,
      driverProfile: {
        phone: data?.phone,
        name: data?.name,
        dateOfBirth: new Date(data?.dateOfBirth as string).toISOString(),
        drivingLicenseNumber: data?.drivingLicenseNumber,
        nationalInsuranceNumber: data?.nationalInsuranceNumber,
        status: DriverProfileStatusEnum.ACTIVE,
        profileImage: postImageResult,
        insurer: data?.insurer,
        policyNumber: data?.policyNumber,
        fleetInsuredNumber: data?.fleetInsuredNumber
      }
    }

    const result = await createDriver(createDriverBody)

    if (get(result, 'message')) {
      toast({
        description: get(result, 'message', 'Create Driver failed'),
        status: 'error'
      })
    } else if (result.id) {
      toast({
        description: 'Create Driver successfully',
        status: 'success'
      })
      setIsOpenModal(false)
    }

    setIsSubmitting(false)
  }

  useEffect(
    function fetchData() {
      if (currentFleetId) {
        fetchDriversPageData()
      }
    },
    [currentFleetId, pageIndex]
  )

  useEffect(
    function fetchData() {
      if (currentFleetId) {
        fetchFleets()
      }
    },
    [currentFleetId]
  )

  if (isLoading) {
    return (
      <Stack width="full" minH="100vh" height="full" alignItems="center" justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Stack>
    )
  }

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
          Drivers
        </Text>
        <HStack width="full" spacing={4} margin={0} marginBottom={5} justifyContent="space-between">
          <Text fontSize="14px" fontWeight="bold">
            Filter
          </Text>
          <ButtonWithIcon
            size={16}
            label="Add Driver"
            iconName="ic-add.svg"
            onClick={() => {
              setIsOpenModal(true)
            }}
          />
        </HStack>
        <Box width="full" height="1px" background="#E8E8E8" marginBottom={5} />
        <DriverTable pageSize={pageSize} fetchDriversPageData={fetchDriversPageData} />
      </VStack>

      <DriverModal
        isLoading={isSubmitting}
        title="Add new driver"
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false)
        }}
        secondaryText="Add Driver"
        onSecondaryClick={() => {
          formRef.current && formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }}
      >
        <AddEditDriverForm formRef={formRef} onSubmit={handleSubmit} />
      </DriverModal>
    </VStack>
  )
}

export default observer(withAuth(DriverPage))
