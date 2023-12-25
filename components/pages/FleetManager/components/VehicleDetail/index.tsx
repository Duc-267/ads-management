import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Flex,
  Switch,
  FormControl,
  FormLabel,
  CardFooter,
  Button,
  useToast
} from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { updateVehicle } from 'API/vehicle'
import { VehicleStatusEnum } from 'enums/vehicleStatus'
import { useStores } from 'hooks/useStores'
import { IVehicle } from 'interfaces/vehicle'
import routes from 'routes'
import AddEditVehicleForm from '../AddEditVehicleModal/AddEditVehicleForm'

interface IVehicleDetailProps {
  vehicleID: string
  fleetID: string
}

const VehicleDetail = (props: IVehicleDetailProps) => {
  const { vehicleID, fleetID } = props
  const formRef = useRef<HTMLFormElement>(null)
  const { vehicleStore } = useStores()
  const { vehicle: vehicleDetail } = vehicleStore
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatusEnum | undefined>(vehicleDetail.status)
  useEffect(() => {
    if (vehicleDetail.status) {
      setVehicleStatus(vehicleDetail.status)
    }
  }, [vehicleDetail.status])

  const handleSubmit = async (data: IVehicle) => {
    setIsSubmitting(true)
    try {
      const result = await updateVehicle({ ...data, status: vehicleStatus, fleetIds: [fleetID] }, vehicleID)
      if (result) {
        toast({
          description: 'Update Vehicle successfully',
          status: 'success',
          duration: 2000,
          isClosable: true
        })

        router.push(routes.fleetManager.vehicles.value)
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
  return (
    <Card>
      <CardHeader borderBottom={'1px'} borderColor={'gray.300'}>
        <Flex justifyContent={'space-between'}>
          <Heading size="md">Vehicle details</Heading>

          <Box>
            <FormControl
              display="flex"
              alignItems="center"
              onChange={() => {
                setVehicleStatus(
                  vehicleStatus === VehicleStatusEnum.ACTIVE ? VehicleStatusEnum.UN_ACTIVE : VehicleStatusEnum.ACTIVE
                )
              }}
            >
              <FormLabel htmlFor="active-vehicle" mb="0">
                Active
              </FormLabel>
              <Switch id="active-vehicle" isChecked={vehicleStatus === VehicleStatusEnum.ACTIVE} />
            </FormControl>
          </Box>
        </Flex>
      </CardHeader>

      <CardBody>
        <AddEditVehicleForm isEdit initVehicle={vehicleDetail} formRef={formRef} onSubmit={handleSubmit} />
      </CardBody>

      <CardFooter>
        <Flex justifyContent={'flex-end'} w="100%">
          <Button
            variant={'outline'}
            mr="12px"
            onClick={() => {
              vehicleStore.resetVehicle(vehicleDetail)
              setVehicleStatus(vehicleDetail.status)
            }}
          >
            Cancle
          </Button>

          <Button
            isLoading={isSubmitting || vehicleStore.isLoading}
            variant="ghost"
            onClick={() => {
              formRef.current && formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
            }}
            backgroundColor="#FFCD1C"
          >
            Save
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

export default observer(VehicleDetail)
